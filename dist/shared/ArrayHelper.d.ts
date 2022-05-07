export declare class ArrayHelper {
    static reverseFind<ArrayType = any>(array: ArrayType[], callback: (element: ArrayType, index: number) => boolean): ArrayType;
    static reverseIndexOf<ArrayType = any>(array: ArrayType[], element: ArrayType, fromIndex?: number): number;
    static reverseSome<ArrayType = any>(array: ArrayType[], callback: (element: ArrayType, index: number) => boolean): boolean;
    static reverseEvery<ArrayType = any>(array: ArrayType[], callback: (element: ArrayType, index: number) => boolean): boolean;
    static reverseForEach<ArrayType = any>(array: ArrayType[], callback: (element: ArrayType, index: number) => any): void;
    static asyncForEach<Type, ResultType>(array: Type[], callback: (item: Type, index: number, array: Type[]) => ResultType, runAsynchronous?: boolean): Promise<any[]>;
    static shuffle<Type>(array: Type[]): Type[];
    static arrayToObject<ArrayType>(array: ArrayType[], indexFunction: (arrayObj: ArrayType) => string | number): {
        [x: string]: ArrayType;
        [x: number]: ArrayType;
    };
    static rotate<T>(array: T[], index: number): T[];
}
