export declare class RandomClass {
    private _seed;
    seedRandom(seed: number): void;
    getRandom(): number;
    getIntRandom(maxValue: number): number;
    getStringRandom(numSigns: number, alphabet?: string): string;
    getRandomElement<Type>(array: Type[], removeElementFromArray?: boolean): Type;
    shuffle<Type>(array: Type[]): Type[];
}
export declare const Random: RandomClass;
