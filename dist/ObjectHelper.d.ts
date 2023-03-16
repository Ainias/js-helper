import { ValueOf } from "./TypeHelper";
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
    static entries<T>(object: T): [keyof T, ValueOf<T>][];
    static keys<T>(object: T): (keyof T)[];
}
