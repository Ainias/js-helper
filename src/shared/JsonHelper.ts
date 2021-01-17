import {Helper} from "./Helper";
import {type} from "os";

export class JsonHelper {
    static deepEqual(a, b) {
        if (a === b) {
            return true;
        }

        if (a === null || b === null) {
            return false;
        }

        // array deepEqual
        if (a instanceof Array && b instanceof Array && a.length === b.length) {
            return a["every"]((obj, i) => {
                return JsonHelper.deepEqual(obj, b[i])
            });
        }

        //date deepEqual
        if (a instanceof Date && b instanceof Date) {
            return a.getTime() === b.getTime();
        }

        // object deep copy
        if (typeof a === "object" && typeof b === "object") {
            let aKeys = Object.keys(a);
            let bKeys = Object.keys(b);

            return aKeys.length === bKeys.length && aKeys["every"]((key) => {
                return Helper.isNotNull(b[key]) && JsonHelper.deepEqual(a[key], b[key])
            })
        }

        //else is false (or not handled)
        return false;
    }

    /**
     * Deepcopies JSON
     *
     * @param obj
     * @returns {*}
     */
    static deepCopy(obj) {
        // https://stackoverflow.com/questions/4120475/how-to-create-and-clone-a-json-object/17502990#17502990
        let i;

        // basic type deep copy
        if (Helper.isNull(obj) || typeof obj !== 'object') {
            return obj
        }
        // array deep copy
        if (obj instanceof Array) {
            let cloneA = [];
            for (i = 0; i < obj.length; ++i) {
                cloneA[i] = JsonHelper.deepCopy(obj[i]);
            }
            return cloneA;
        }
        if (obj instanceof Date) {
            return new Date(obj.getTime());
        }
        // object deep copy
        let cloneO = {};
        for (i in obj) {
            cloneO[i] = JsonHelper.deepCopy(obj[i]);
        }
        return cloneO;
    }

    static deepAssign(...objects) {
        if (objects.length > 0 && Array.isArray(objects)) {
            const result = [];
            objects.forEach(arr => result.push(...arr));
            return result;
        }

        const resultObj = {};
        objects.forEach(obj => {
            for (let i in obj) {
                if (resultObj[i] && typeof obj[i] === "object" && typeof resultObj[i] === "object") {
                    resultObj[i] = JsonHelper.deepAssign(resultObj[i], obj[i]);
                } else {
                    resultObj[i] = obj[i];
                }
            }
        });
        return resultObj;
    }

    static getDiff(a, b) {
        const result = {
            changed: {},
            added: {},
            removed: [],
        }

        // if (Array.isArray(a) && Array.isArray(b)){
        //     const lengthA = a.length;
        //     const lengthB = b.length;
        //
        //     const minLength = Math.min(lengthA, lengthB);
        //     for (let i = 0; i < minLength; i++){
        //         const
        //     }
        // }
        if ((typeof a !== "object" || typeof b !== "object")
            && (!Array.isArray(a) && !Array.isArray(b))) {
            if (a === b) {
                return null;
            } else {
                return {value: b};
            }
        }

        let hasChanged = false;
        let hasRemoved = false;
        let hasAdded = false;

        for (let i in a) {
            if (i in b) {
                const newVal = JsonHelper.getDiff(a[i], b[i]);
                if (newVal !== null) {
                    result.changed[i] = newVal;
                    hasChanged = true;
                }
            } else {
                result.removed.push(i);
                hasRemoved = true;
            }
        }
        for (let i in b) {
            if (!(i in a)) {
                result.added[i] = b[i];
                hasAdded = true;
            }
        }

        if (hasRemoved || hasAdded || hasChanged) {
            return result;
        } else {
            return null;
        }
    }

    static applyDiff(obj, diff: { changed: any, added: any, removed: string[] }) {
        if (!Array.isArray(diff.removed)) {
            debugger;
        }

        Object.keys(diff.changed).forEach(key => {
            if ("value" in diff.changed[key]) {
                obj[key] = diff.changed[key].value;
            } else {
                obj[key] = JsonHelper.applyDiff(obj[key], diff.changed[key]);
            }
        });
        diff.removed.forEach(rem => delete obj[rem]);
        Object.keys(diff.added).forEach(key => obj[key] = diff.added[key]);
        return obj;
    }
}