export declare class Random {
    private static _seed;
    static seedRandom(seed: number): void;
    static getRandom(): number;
    static getIntRandom(maxValue: number): number;
    static getStringRandom(numSigns: number, alphabet?: string): string;
}
