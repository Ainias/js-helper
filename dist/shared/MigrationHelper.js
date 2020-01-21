"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Helper_1 = require("./Helper");
class MigrationHelper {
    static isServer() {
        return (typeof document !== "object");
    }
    static addTableFromModelClass(modelClass, queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield queryRunner.createTable(this.createTableFromModelClass(modelClass));
        });
    }
    static addManyToManyTable(tableOne, tableTwo, queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield queryRunner.createTable(this.createManyToManyTable(tableOne, tableTwo));
        });
    }
    static createManyToManyTable(tableOne, tableTwo) {
        let fieldOne = tableOne + "Id";
        let fieldTwo = tableTwo + "Id";
        let name = tableOne + tableTwo.substr(0, 1).toUpperCase() + tableTwo.substr(1);
        let manyToManyTable = new typeorm_1.Table({
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
    static createTableFromModelClass(modelClass, prefix) {
        prefix = Helper_1.Helper.nonNull(prefix, "");
        let columns = [];
        let indices = [];
        let foreignKeys = [];
        let schemaDefinition = modelClass.getSchemaDefinition();
        let tableName = prefix + Helper_1.Helper.toSnakeCase(schemaDefinition.name);
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
                if (Helper_1.Helper.isNull(modelClass.CAN_BE_SYNCED) || this.isServer() || column === "clientId") {
                    columnConfig["isGenerated"] = true;
                    columnConfig["generationStrategy"] = "increment";
                }
            }
            if (typeof columnConfig["default"] === "string") {
                columnConfig["default"] = "'" + columnConfig["default"] + "'";
            }
            if (columnConfig["type"] === MigrationHelper.TYPES.MEDIUMTEXT && !this.isServer()) {
                columnConfig["type"] = MigrationHelper.TYPES.TEXT;
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
                    referencedTableName: Helper_1.Helper.toSnakeCase(schemaDefinition.relations[relation].target),
                    referencedColumnNames: ["id"]
                };
                foreignKeys.push(foreignKeyConfig);
            }
        });
        return new typeorm_1.Table({
            name: tableName,
            columns: columns,
            indices: indices,
            foreignKeys: foreignKeys
        });
    }
    static updateModel(queryRunner, newModel) {
        return __awaiter(this, void 0, void 0, function* () {
            let schemaDefinition = newModel.getSchemaDefinition();
            let tableName = Helper_1.Helper.toSnakeCase(schemaDefinition.name);
            let tableNameTemp = tableName + "__temp__";
            let newTable = this.createTableFromModelClass(newModel, "__temp__");
            // newTable.name = tableNameTemp;
            tableNameTemp = newTable.name;
            yield queryRunner.createTable(newTable);
            let table = yield queryRunner.getTable(tableName);
            let names = [];
            table.columns.forEach(column => {
                names.push(column.name);
            });
            yield queryRunner.query("INSERT INTO " + tableNameTemp + "(" + names.join(",") + ") SELECT " + names.join(",") + " FROM " + tableName + ";");
            yield queryRunner.query("DROP TABLE " + tableName + ";");
            yield queryRunner.query("ALTER TABLE " + tableNameTemp + " RENAME TO " + tableName + ";");
        });
    }
}
exports.MigrationHelper = MigrationHelper;
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
//# sourceMappingURL=MigrationHelper.js.map