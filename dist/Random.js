"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Random = void 0;
const Helper_1 = require("./Helper");
class Random {
    static seedRandom(seed) {
        this._seed = seed;
    }
    static getRandom() {
        let t = this._seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
    static getIntRandom(maxValue) {
        return Math.floor(Random.getRandom() * (maxValue + 1));
    }
    static getStringRandom(numSigns, alphabet) {
        alphabet = Helper_1.Helper.nonNull(alphabet, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");
        let random = "";
        const numAlphabet = alphabet.length - 1;
        for (let i = 0; i < numSigns; i++) {
            random += alphabet[Random.getIntRandom(numAlphabet)];
        }
        return random;
    }
}
exports.Random = Random;
Random._seed = new Date().getTime();
//# sourceMappingURL=Random.js.map