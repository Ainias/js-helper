export type PropertyNamesWithoutType<T, Excluded> = {
    [K in keyof T]: T[K] extends Excluded ? never : K
}[keyof T];

export type PropertyNamesWithType<T, Includes> = {
    [K in keyof T]: T[K] extends Includes ? K : never
}[keyof T];

export type ExcludePropertyType<T, Excluded> = Pick<T, PropertyNamesWithoutType<T, Excluded>>;
export type OnlyPropertyType<T, Only> = Pick<T, PropertyNamesWithType<T, Only>>;
export type ExcludeUndefined<T> = Exclude<T, undefined>

export type ReplacePropertyType<T, Search, Replacement> = {
    [K in keyof T]: T[K] extends Search ? Replacement : T[K]
};

export type Override<T1, T2> = Omit<T1, keyof T2> & T2;
export type Conditional<T1, T2> = Partial<T1> | (T1 & T2);
export type ValueOf<T> = T[keyof T];
export type Recursive<T> = T | T[] | Recursive<T>[];

export type URecord<Key extends number|string|symbol, Value> = Record<Key, Value|undefined>
