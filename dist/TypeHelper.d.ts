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
export declare type Override<T1, T2> = Omit<T1, keyof T2> & T2;
export declare type Conditional<T1, T2> = Partial<T1> | (T1 & T2);
export declare type ValueOf<T> = T[keyof T];
export declare type Recursive<T> = T | T[] | Recursive<T>[];