import { URecord } from "./TypeHelper";
export declare class ArrayHelper {
    static noUndefined<ArrayType>(array: (ArrayType)[]): Exclude<ArrayType, undefined>[];
    static reverseFind<ArrayType = any>(array: ArrayType[], callback: (element: ArrayType, index: number) => boolean): ArrayType;
    static reverseIndexOf<ArrayType = any>(array: ArrayType[], element: ArrayType, fromIndex?: number): number;
    static reverseSome<ArrayType = any>(array: ArrayType[], callback: (element: ArrayType, index: number) => boolean): boolean;
    static reverseEvery<ArrayType = any>(array: ArrayType[], callback: (element: ArrayType, index: number) => boolean): boolean;
    static reverseForEach<ArrayType = any>(array: ArrayType[], callback: (element: ArrayType, index: number) => any): void;
    static asyncForEach<Type, ResultType>(array: Type[], callback: (item: Type, index: number, array: Type[]) => ResultType, runAsynchronous?: boolean): Promise<ResultType[]>;
    static shuffle<Type>(array: Type[]): Type[];
    static arrayToObject<ArrayType, Key extends symbol | string | number>(array: ArrayType[], index: ((arrayObj: ArrayType) => Key)): URecord<Key, ArrayType>;
    static groupBy<ArrayType, Key extends symbol | string | number>(array: ArrayType[], index: ((arrayObj: ArrayType) => Key)): URecord<Key, ArrayType[]>;
    static rotate<T>(array: T[], index: number): T[];
}
