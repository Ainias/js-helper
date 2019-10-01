import {Table} from "typeorm";

export class MigrationHelper{
    static isServer(){
        return (typeof document !== "object")
    }

    static createManyToManyTable(tableOne, tableTwo) {
        let fieldOne = tableOne+"Id";
        let fieldTwo = tableTwo+"Id";
        let name = tableOne+tableTwo.substr(0,1).toUpperCase()+tableTwo.substr(1);

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
                    name: "IDX_"+name+"_"+fieldOne,
                    columnNames: [fieldOne]
                },
                {
                    name: "IDX_"+name+"_"+fieldTwo,
                    columnNames: [fieldTwo]
                }
            ],
            foreignKeys: [
                {
                    name: "FK_"+name+"_"+fieldOne,
                    columnNames: [fieldOne],
                    referencedTableName: tableOne,
                    referencedColumnNames: ["id"],
                    onDelete: "cascade",
                },
                {
                    name: "FK_"+name+"_"+fieldTwo,
                    columnNames: [fieldTwo],
                    referencedTableName: tableTwo,
                    referencedColumnNames: ["id"],
                    onDelete: "cascade",
                },
            ]
        });
        return manyToManyTable;
    }
}