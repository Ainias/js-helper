class Test {
    a: number;
    b?: number;
    c?: string;
    d?: Date;
    e = () => {
        console.log("e")
    };

    f: Test
}

export type PropertyNamesWithoutType<T, Excluded> = {
    [K in keyof T]: T[K] extends Excluded ? never : K
}[keyof T];

export type PropertyNamesWithType<T, Includes> = {
    [K in keyof T]: T[K] extends Includes ? K : never
}[keyof T];

export type ExcludePropertyType<T, Excluded> = Pick<T, PropertyNamesWithoutType<T, Excluded>>;
export type OnlyPropertyType<T, Only> = Pick<T, PropertyNamesWithType<T, Only>>;

export type ReplacePropertyType<T, Search, Replacement> = {
    [K in keyof T]: T[K] extends Search ? Replacement : T[K]
};
