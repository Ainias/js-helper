import {Helper} from "./Helper";
import {ExcludeUndefined, PropertyNamesWithType, URecord} from "./TypeHelper";
import {type} from "os";

export class ArrayHelper {

    static noUndefined<ArrayType>(array: (ArrayType)[]) {
        return array.filter(arr => arr !== undefined) as ExcludeUndefined<ArrayType>[];
    }

    static reverseFind<ArrayType = any>(array: ArrayType[], callback: (element: ArrayType, index: number) => boolean) {
        for (let i = array.length - 1; i >= 0; i--) {
            if (callback(array[i], i)) {
                return array[i];
            }
        }
        return undefined;
    }

    static reverseIndexOf<ArrayType = any>(array: ArrayType[], element: ArrayType, fromIndex: number = array.length - 1) {
        for (let i = Math.min(fromIndex, array.length - 1); i >= 0; i--) {
            if (array[i] === element) {
                return i;
            }
        }
        return -1;
    }

    static reverseSome<ArrayType = any>(array: ArrayType[], callback: (element: ArrayType, index: number) => boolean) {
        for (let i = array.length - 1; i >= 0; i--) {
            if (callback(array[i], i)) {
                return true;
            }
        }
        return false;
    }

    static reverseEvery<ArrayType = any>(array: ArrayType[], callback: (element: ArrayType, index: number) => boolean) {
        for (let i = array.length - 1; i >= 0; i--) {
            if (!callback(array[i], i)) {
                return false;
            }
        }
        return true;
    }

    static reverseForEach<ArrayType = any>(array: ArrayType[], callback: (element: ArrayType, index: number) => any) {
        for (let i = array.length - 1; i >= 0; i--) {
            callback(array[i], i);
        }
    }

    static async asyncForEach<Type, ResultType>(array: Type[], callback: (item: Type, index: number, array: Type[]) => ResultType, runAsynchronous?: boolean) {
        runAsynchronous = Helper.nonNull(runAsynchronous, false);

        let validPromises = [];
        for (let i = 0; i < array.length; i++) {
            let index = i;
            let currentPromise = Promise.resolve(callback(array[index], index, array));
            if (!runAsynchronous) {
                await currentPromise;
            }
            validPromises.push(currentPromise);
        }
        return Promise.all(validPromises);
    }

    static shuffle<Type>(array: Type[]) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    static arrayToObject<ArrayType, Key extends symbol | string | number>(array: ArrayType[], index: ((arrayObj: ArrayType) => Key)) {
        const obj = {} as URecord<Key, ArrayType>;
        array.forEach(val => {
            obj[index(val)] = val;
        });
        return obj;
    }

    static groupBy<ArrayType, Key extends symbol | string | number>(array: ArrayType[], index: ((arrayObj: ArrayType) => Key)) {
        const obj = {} as URecord<Key, ArrayType[]>;
        array.forEach(val => {
            const key = index(val);
            obj[key] ??= [];
            obj[key].push(val);
        });
        return obj;
    }

    static rotate<T>(array: T[], index: number): T[] {
        index %= array.length;
        if (index < 0) {
            index += array.length
        }
        const arrCopy = array.slice(0);
        const rotatingPart = arrCopy.splice(0, index);
        arrCopy.push(...rotatingPart);
        return arrCopy;
    }
}
