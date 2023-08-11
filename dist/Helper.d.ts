import { PromiseWithHandlers } from "./Promises/PromiseWithHandlers";
export declare class Helper {
    /**
     * Testet, ob eine Variable null oder Undefined ist
     *
     * @param variable
     * @returns {boolean}
     */
    static isNull<T>(variable: T | null | undefined): variable is null | undefined;
    static isAllNull(...args: any[]): boolean;
    static isAtLeastOneNull(...args: any[]): boolean;
    /**
     * Testet, ob eine Variable nicht (null oder undefined) ist
     *
     * @param variable
     * @returns {boolean}
     */
    static isNotNull<T>(variable: T): variable is Exclude<T, null | undefined>;
    static isAllNotNull(...args: any[]): boolean;
    static isAtLeastOneNotNull(...args: any[]): boolean;
    static delay<ResultType>(duration: number, args?: ResultType): Promise<ResultType>;
    /**
     * Gibt den ersten übergebenen Wert, der nicht (null oder undefined) ist, zurück
     *
     * @param val1
     * @param val2
     * @param args
     * @returns {*}
     */
    static nonNull(val1: any, val2?: any, ...args: any[]): any;
    /**
     * Testet, ob ein Wert null oder Leerstring, bzw nur aus leerzeichend bestehender String ist
     *
     * @param value
     * @returns {boolean}
     */
    static empty(value: any): boolean;
    /**
     * Testet, ob ein Wert NICHT (null oder Leerstring, bzw nur aus leerzeichend bestehender String ist)
     *
     * @param value
     * @returns {boolean}
     */
    static notEmpty(value: any): boolean;
    /**
     * @deprecated Use ArrayHelper.arrayToObject instead
     *
     * @param array
     * @param indexFunction
     */
    static arrayToObject<ArrayType = any>(array: ArrayType[], indexFunction: (arrayObj: ArrayType) => string | number): import("./TypeHelper").URecord<string | number, ArrayType>;
    /**
     * Erstellt ein FormData-Object von JSON-Data. Nützlich für fetch
     *
     * @param obj
     * @returns {FormData}
     */
    static formDataFromObject(obj: any): FormData;
    static padZero(n: any, width?: any, z?: any): any;
    static htmlspecialcharsDecode(text: any): any;
    static escapeRegExp(str: any): any;
    static imageUrlIsEmpty(url: any): boolean;
    static isMobileApp(): boolean;
    static isIOS(): boolean;
    static toSnakeCase(camelCase: any): any;
    static wait(timeout: any, result?: any): Promise<unknown>;
    static timeout(time: any, otherPromise: any, timeoutResult?: any): Promise<any>;
    static execNonThrow(fn: (...any: any) => any): (...args: any[]) => any;
    /** @deprecated Use ArrayHelper.shuffle instead */
    static shuffleArray(array: any): unknown[];
    /** @deprecated use ArrayHelper.reverseForEach instead */
    static reverseForEach<ArrayType = any>(array: ArrayType[], callback: (element: ArrayType, index: number) => any): void;
    /** @deprecated use ArrayHelper.asyncForEach instead */
    static asyncForEach(array: any, callback: any, runAsynchronous?: any): Promise<any[]>;
    /** @deprecated use ObjectHelper.objectForEach instead */
    static objectForEach(object: any, callback: any): void;
    /** @deprecated use ObjectHelper.toArray instead */
    static toArray(object: any): any[];
    /**
     * @deprecated Use ObjectHelper.invertKeyValues instead
     *
     * Inverts the key-Values for an object
     * @param obj
     * @return {*}
     */
    static invertKeyValues(obj: any): {};
    /**
     * @deprecated Use ObjectHelper.isSet instead
     *
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
    /** @deprecated use PromiseWithHandlers instead */
    static newPromiseWithResolve(): PromiseWithHandlers<unknown>;
    /**
     * @deprecated Use JsonHelper.deepCopy instead
     *
     * Deepcopies JSON
     *
     * @param obj
     * @returns {*}
     */
    static cloneJson(obj: any): any;
}
