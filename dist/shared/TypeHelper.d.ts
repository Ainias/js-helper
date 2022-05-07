export declare type PropertyNamesWithoutType<T, Excluded> = {
    [K in keyof T]: T[K] extends Excluded ? never : K;
}[keyof T];
export declare type PropertyNamesWithType<T, Includes> = {
    [K in keyof T]: T[K] extends Includes ? K : never;
}[keyof T];
export declare type ExcludePropertyType<T, Excluded> = Pick<T, PropertyNamesWithoutType<T, Excluded>>;
export declare type OnlyPropertyType<T, Only> = Pick<T, PropertyNamesWithType<T, Only>>;
export declare type ReplacePropertyType<T, Search, Replacement> = {
    [K in keyof T]: T[K] extends Search ? Replacement : T[K];
};
