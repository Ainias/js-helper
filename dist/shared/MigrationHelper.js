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
exports.MigrationHelper = void 0;
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
                    if (!this.isServer()) {
                        columnConfig["type"] = "INTEGER";
                    }
                }
            }
            if (typeof columnConfig["default"] === "string") {
                columnConfig["default"] = "'" + columnConfig["default"] + "'";
            }
            else if (columnConfig["default"] === true) {
                columnConfig["default"] = 1;
            }
            else if (columnConfig["default"] === false) {
                columnConfig["default"] = 0;
            }
            if (columnConfig["type"] === MigrationHelper.TYPES.SIMPLE_JSON) {
                columnConfig["type"] = MigrationHelper.TYPES.TEXT;
            }
            if (columnConfig["type"] === MigrationHelper.TYPES.MEDIUMTEXT && !this.isServer()) {
                columnConfig["type"] = MigrationHelper.TYPES.TEXT;
            }
            if (columnConfig["type"] === MigrationHelper.TYPES.SIMPLE_JSON && !this.isServer()) {
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
            let newTable = this.createTableFromModelClass(newModel);
            let table = yield queryRunner.getTable(tableName);
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
                    if (column.default !== null && typeof column.default === "string" && column.default.startsWith("'") && column.default.endsWith("'") && (column.type !== "varchar" || column.default.startsWith("''"))) {
                        column.default = column.default.substring(1, column.default.length - 1);
                    }
                });
            }
            yield queryRunner.createTable(table);
            let names = [];
            table.columns.forEach(column => {
                names.push(column.name);
            });
            yield queryRunner.query("INSERT INTO " + table.name + "(`" + names.join("`,`") + "`) SELECT `" + names.join("`,`") + "` FROM " + tableName + ";");
            yield queryRunner.query("DROP TABLE " + tableName + ";");
            yield queryRunner.createTable(newTable);
            let newColumnNames = [];
            newTable.columns.forEach(column => newColumnNames.push(column.name));
            names = [];
            table.columns.forEach(column => {
                if (newColumnNames.indexOf(column.name) !== -1) {
                    names.push(column.name);
                }
            });
            yield queryRunner.query("INSERT INTO " + tableName + "(`" + names.join("`,`") + "`) SELECT `" + names.join("`,`") + "` FROM " + table.name + ";");
            yield queryRunner.query("DROP TABLE " + table.name + ";");
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