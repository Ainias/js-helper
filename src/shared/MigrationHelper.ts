import {QueryRunner, Table} from "typeorm";
import {Helper} from "./Helper";
import {JsonHelper} from "./JsonHelper";

export class MigrationHelper {

    static TYPES;

    static isServer() {
        return (typeof document !== "object")
    }

    static async addTableFromModelClass(modelClass, queryRunner) {
        return await queryRunner.createTable(this.createTableFromModelClass(modelClass));
    }

    static async addManyToManyTable(tableOne, tableTwo, queryRunner) {
        return await queryRunner.createTable(this.createManyToManyTable(tableOne, tableTwo));
    }

    static createManyToManyTable(tableOne, tableTwo) {
        let fieldOne = tableOne + "Id";
        let fieldTwo = tableTwo + "Id";
        let name = tableOne + tableTwo.substr(0, 1).toUpperCase() + tableTwo.substr(1);

        let manyToManyTable = new Table({
            name: name,
            columns: [
                {
                    name: fieldOne,
                    isPrimary: true,
                    type: "integer"
                },
                {
                    name: fieldTwo,
                    isPrimary: true,
                    type: "integer"
                }
            ],
            indices: [
                {
                    name: "IDX_" + name + "_" + fieldOne,
                    columnNames: [fieldOne]
                },
                {
                    name: "IDX_" + name + "_" + fieldTwo,
                    columnNames: [fieldTwo]
                }
            ],
            foreignKeys: [
                {
                    name: "FK_" + name + "_" + fieldOne,
                    columnNames: [fieldOne],
                    referencedTableName: tableOne.replace(/([A-Z])/, (match, p1) => "_" + p1.toLowerCase()),
                    referencedColumnNames: ["id"],
                    onDelete: "cascade",
                },
                {
                    name: "FK_" + name + "_" + fieldTwo,
                    columnNames: [fieldTwo],
                    referencedTableName: tableTwo.replace(/([A-Z])/, (match, p1) => "_" + p1.toLowerCase()),
                    referencedColumnNames: ["id"],
                    onDelete: "cascade",
                },
            ]
        });
        return manyToManyTable;
    }

    static createTableFromModelClass(modelClass, prefix?) {
        prefix = Helper.nonNull(prefix, "");

        let columns = [];
        let indices = [];
        let foreignKeys = [];
        let schemaDefinition = modelClass.getSchemaDefinition();
        let tableName = prefix + Helper.toSnakeCase(schemaDefinition.name);

        Object.keys(schemaDefinition.columns).forEach(column => {

            let columnConfig = {};
            Object.keys(schemaDefinition.columns[column]).forEach(key => {
                columnConfig[key] = schemaDefinition.columns[column][key];
            });
            columnConfig["name"] = column;

            if (schemaDefinition.columns[column].primary) {
                columnConfig["isPrimary"] = true;
            }
            if (schemaDefinition.columns[column].nullable) {
                columnConfig["isNullable"] = true;
            }
            if (schemaDefinition.columns[column].generated) {
                //If it is not EasySyncBaseModel or server
                if (Helper.isNull(modelClass.CAN_BE_SYNCED) || this.isServer() || column === "clientId") {
                    columnConfig["isGenerated"] = true;
                    columnConfig["generationStrategy"] = "increment" as "increment";
                    if (!this.isServer()) {
                        columnConfig["type"] = "INTEGER";
                    }
                }
            }
            if (typeof columnConfig["default"] === "string") {
                columnConfig["default"] = "'" + columnConfig["default"] + "'";
            } else if (columnConfig["default"] === true) {
                columnConfig["default"] = 1;
            } else if (columnConfig["default"] === false) {
                columnConfig["default"] = 0;
            }

            if (columnConfig["type"] === MigrationHelper.TYPES.SIMPLE_JSON) {
                columnConfig["type"] = MigrationHelper.TYPES.TEXT
            }

            if (columnConfig["type"] === MigrationHelper.TYPES.MEDIUMTEXT && !this.isServer()) {
                columnConfig["type"] = MigrationHelper.TYPES.TEXT
            }

            if (columnConfig["type"] === MigrationHelper.TYPES.SIMPLE_JSON && !this.isServer()) {
                columnConfig["type"] = MigrationHelper.TYPES.TEXT
            }
            columns.push(columnConfig);
        });

        Object.keys(schemaDefinition.relations).forEach(relation => {
            if (schemaDefinition.relations[relation].type === "many-to-one" || schemaDefinition.relations[relation].joinColumn) {
                // let columnName = Helper.toSnakeCase(relation) + "Id";
                let columnName = relation.substr(0, 1).toLowerCase() + relation.substr(1) + "Id";
                let columnConfig = {
                    name: columnName,
                    type: MigrationHelper.TYPES.INTEGER,
                    isNullable: true
                };
                columns.push(columnConfig);

                let indexConfig = {
                    name: "IDX_" + tableName + "_" + columnName,
                    columnNames: [columnName]
                };
                indices.push(indexConfig);

                let foreignKeyConfig = {
                    name: "FK_" + tableName + "_" + columnName,
                    columnNames: [columnName],
                    referencedTableName: Helper.toSnakeCase(schemaDefinition.relations[relation].target),
                    referencedColumnNames: ["id"]
                };
                foreignKeys.push(foreignKeyConfig);
            }
        });

        return new Table({
            name: tableName,
            columns: columns,
            indices: indices,
            foreignKeys: foreignKeys
        });
    }

    static async updateModel(queryRunner: QueryRunner, newModel) {

        let schemaDefinition = newModel.getSchemaDefinition();
        let tableName = Helper.toSnakeCase(schemaDefinition.name);

        let newTable = this.createTableFromModelClass(newModel);

        let table = await queryRunner.getTable(tableName);
        table.name = "__temp__" + table.name;
        table.indices.forEach(index => {
            index.name = "__temp__" + index.name;
        });
        table.foreignKeys.forEach(key => {
            key.name = "__temp__" + key.name;
            key.columnNames = [key.columnNames[0]];
            key.referencedColumnNames = [key.referencedColumnNames[0]];
        });

        if (MigrationHelper.isServer()) {
            table.columns.forEach(column => {
                if (column.default !== null && typeof column.default === "string" && column.default.startsWith("'") && column.default.endsWith("'")) {
                    column.default = column.default.substring(1, column.default.length - 1);
                }
            })
        }

        await queryRunner.createTable(table);

        let names = [];
        table.columns.forEach(column => {
            names.push(column.name);
        });

        await queryRunner.query("INSERT INTO " + table.name + "(`" + names.join("`,`") + "`) SELECT `" + names.join("`,`") + "` FROM " + tableName + ";");
        await queryRunner.query("DROP TABLE " + tableName + ";");

        await queryRunner.createTable(newTable);

        let newColumnNames = [];
        newTable.columns.forEach(column => newColumnNames.push(column.name));

        names = [];
        table.columns.forEach(column => {
            if (newColumnNames.indexOf(column.name) !== -1) {
                names.push(column.name);
            }
        });

        await queryRunner.query("INSERT INTO " + tableName + "(`" + names.join("`,`") + "`) SELECT `" + names.join("`,`") + "` FROM " + table.name + ";");
        await queryRunner.query("DROP TABLE " + table.name + ";");
    }
}

MigrationHelper.TYPES = {
    INTEGER: "int",
    FLOAT: "float",
    DATE: "datetime",
    STRING: "varchar",
    TEXT: "text",
    MEDIUMTEXT: "mediumtext",
    BOOLEAN: "boolean",
    JSON: "json",
    SIMPLE_JSON: "simple-json",
    MY_JSON: "my-json"
};