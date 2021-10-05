export declare class ArrayHelper {
    static reverseFind<ArrayType = any>(array: ArrayType[], callback: (element: ArrayType, index: number) => boolean): ArrayType;
    static reverseIndexOf<ArrayType = any>(array: ArrayType[], element: ArrayType, fromIndex?: number): number;
    static reverseSome<ArrayType = any>(array: ArrayType[], callback: (element: ArrayType, index: number) => boolean): boolean;
    static reverseEvery<ArrayType = any>(array: ArrayType[], callback: (element: ArrayType, index: number) => boolean): boolean;
    static reverseForEach<ArrayType = any>(array: ArrayType[], callback: (element: ArrayType, index: number) => any): void;
    static asyncForEach(array: any, callback: any, runAsynchronous?: any): Promise<any[]>;
    static shuffle(array: any): any;
}
