export declare class JsonHelper {
    static deepEqual(a: any, b: any, depth?: number): any;
    /**
     * Deepcopies JSON
     *
     * @param obj
     * @returns {*}
     */
    static deepCopy<T>(obj: T): T;
    static deepAssign(...objects: any[]): {};
    static getDiff(a: any, b: any): {
        changed: {};
        added: {};
        removed: any[];
    } | {
        value: any;
    };
    static applyDiff(obj: any, diff: {
        changed: any;
        added: any;
        removed: string[];
    }): any;
}
