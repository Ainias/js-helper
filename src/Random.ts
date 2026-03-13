import {Helper} from "./Helper";

export class RandomClass {
    private _seed: number = new Date().getTime();

    seedRandom(seed: number) {
        this._seed = seed;
    }

    getRandom() {
        let t = this._seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }

    getIntRandom(maxValue: number){
        return Math.floor(this.getRandom() * (maxValue+1));
    }

    getStringRandom(numSigns: number, alphabet =  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"): string{
        let random = "";
        const numAlphabet = alphabet.length-1;
        for(let i = 0; i < numSigns; i++){
            random += alphabet[this.getIntRandom(numAlphabet)];
        }
        return random;
    }

    getRandomElement<Type>(array: Type[], removeElementFromArray = false){
        if (array.length === 0){
            return undefined;
        }

        const index = this.getIntRandom(array.length-1);
        const element = array[index];
        if (removeElementFromArray){
            array.splice(index, 1);
        }
        return element;
    }

    shuffle<Type>(array: Type[]){
        for (let i = array.length - 1; i > 0; i--) {
            const j = this.getIntRandom(i);
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

export const Random = new RandomClass();
