import { ExcludeUndefined, URecord, ValueOf } from "./TypeHelper";
export declare class ObjectHelper {
    /**
     * Inverts the key-Values for an object
     * @param obj
     * @return {*}
     */
    static invertKeyValues(obj: any): {};
    static toArray(object: any): any[];
    static objectForEach(object: any, callback: any): void;
    static deepEqual(a: any, b: any): any;
    /**
     * Testet, ob der übergebene Index am Objekt gesetzt ist. Werden mehrere Indexes übergeben, so wird getestet,
     * ob die "Index-Kette" gesetzt ist.
     * Bsp.:
     *  Helper.isSet({"index1":{"index2":value}}, "index1", "index2") ist wahr
     *
     * @param object
     * @param indexes
     * @returns {*}
     */
    static isSet(object: any, ...indexes: any[]): any;
    static entries<T extends URecord<any, any>, B extends boolean = true>(object: T, filterUndefined?: B): B extends false ? [keyof T, ValueOf<T>][] : [keyof T, ExcludeUndefined<ValueOf<T>>][];
    static values<T extends URecord<any, any>, B extends boolean = true>(object: T, filterUndefined?: B): B extends false ? ValueOf<T>[] : ExcludeUndefined<ValueOf<T>>[];
    static keys<T extends URecord<any, any>>(object: T): (keyof T)[];
}
