import { ExcludePropertyType, ReplacePropertyType } from "./TypeHelper";
export type JSONNativeValue = string | number | boolean | null | undefined;
export type JSONValue = JSONNativeValue | JSONObject | JSONArray;
export type JSONObject = {
    [x: string]: JSONValue;
};
export type JSONArray = Array<JSONValue>;
export type JSONType<T, T2 extends ReplacePropertyType<ExcludePropertyType<T, Function>, Date, string> = ReplacePropertyType<ExcludePropertyType<T, Function>, Date, string>> = {
    [K in keyof T2]: T2[K] extends object ? JSONType<T2[K]> : T2[K];
};
