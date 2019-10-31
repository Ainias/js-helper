import {Table} from "typeorm";
import {Helper} from "./Helper";

export class MigrationHelper {

    static TYPES;

    static isServer() {
        return (typeof document !== "object")
    }

    static async addTableFromModelClass(modelClass, queryRunner){
        return await queryRunner.createTable(this.createTableFromModelClass(modelClass));
    }

    static async addManyToManyTable(tableOne, tableTwo, queryRunner){
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
                    referencedTableName: tableOne,
                    referencedColumnNames: ["id"],
                    onDelete: "cascade",
                },
                {
                    name: "FK_" + name + "_" + fieldTwo,
                    columnNames: [fieldTwo],
                    referencedTableName: tableTwo,
                    referencedColumnNames: ["id"],
                    onDelete: "cascade",
                },
            ]
        });
        return manyToManyTable;
    }

    static createTableFromModelClass(modelClass) {
        let columns = [];
        let indices = [];
        let foreignKeys = [];
        let schemaDefinition = modelClass.getSchemaDefinition();
        let tableName = Helper.toSnakeCase(schemaDefinition.name);

        Object.keys(schemaDefinition.columns).forEach(column => {
            let columnConfig = {
                name: column,
                type: schemaDefinition.columns[column].type
            };
            if (schemaDefinition.columns[column].primary) {
                columnConfig["isPrimary"] = true;
            }
            if (schemaDefinition.columns[column].generated) {
                //If it is not EasySyncBaseModel or server
                if (Helper.isNull(modelClass.CAN_BE_SYNCED) || this.isServer()) {
                    columnConfig["isGenerated"] = true;
                    columnConfig["generationStrategy"] = "increment" as "increment";
                }
            }

            if (columnConfig.type === MigrationHelper.TYPES.MEDIUMTEXT && !this.isServer()){
                columnConfig.type = MigrationHelper.TYPES.TEXT
            }
            columns.push(columnConfig);
        });

        Object.keys(schemaDefinition.relations).forEach(relation => {
            if (schemaDefinition.relations[relation].type === "many-to-one" || schemaDefinition.relations[relation].joinColumn){
                let columnName = Helper.toSnakeCase(schemaDefinition.relations[relation].target)+"Id";
                let columnConfig = {
                    name: columnName,
                    type: MigrationHelper.TYPES.INTEGER,
                    isNullable: true
                };
                columns.push(columnConfig);

                let indexConfig = {
                    name: "IDX_"+tableName+"_"+columnName,
                    columnNames: [columnName]
                };
                indices.push(indexConfig);

                let foreignKeyConfig = {
                    name: "FK_"+tableName+"_"+columnName,
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
    MY_JSON:"my-json"
};