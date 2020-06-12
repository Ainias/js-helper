export class Random{
    private static _seed: any = new Date().getTime();

    static seedRandom(seed) {
        this._seed = seed;
    }

    static getRandom() {
        let t = this._seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }

    static getIntRandom(maxValue){
        Math.floor(Random.getRandom() * (maxValue+1));
    }
}