import { ExcludePropertyType, ReplacePropertyType } from "./TypeHelper";
export declare type JSONNativeValue = string | number | boolean | null | undefined;
export declare type JSONValue = JSONNativeValue | JSONObject | JSONArray;
export declare type JSONObject = {
    [x: string]: JSONValue;
};
export declare type JSONArray = Array<JSONValue>;
export declare type JSONType<T, T2 extends ReplacePropertyType<ExcludePropertyType<T, Function>, Date, string> = ReplacePropertyType<ExcludePropertyType<T, Function>, Date, string>> = {
    [K in keyof T2]: T2[K] extends object ? JSONType<T2[K]> : T2[K];
};
