import type { QueryRunner } from "typeorm";
import { Table } from "typeorm";
export declare class MigrationHelper {
    static TYPES: any;
    static isServer(): boolean;
    static addTableFromModelClass(modelClass: any, queryRunner: any): Promise<any>;
    static addManyToManyTable(tableOne: any, tableTwo: any, queryRunner: any): Promise<any>;
    static createManyToManyTable(tableOne: any, tableTwo: any): Table;
    static createTableFromModelClass(modelClass: any, prefix?: any): Table;
    static updateModel(queryRunner: QueryRunner, newModel: any): Promise<void>;
}
