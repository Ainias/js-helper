import {Helper} from "./Helper";
import {ValueOf} from "./TypeHelper";

export class ObjectHelper{
    /**
     * Inverts the key-Values for an object
     * @param obj
     * @return {*}
     */
    static invertKeyValues(obj) {
        let new_obj = {};

        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                new_obj[obj[prop]] = prop;
            }
        }

        return new_obj;
    }

    static toArray(object) {
        let res = [];
        for (let k in object) {
            res.push(object[k]);
        }
        return res;
    }

    static objectForEach(object, callback) {
        Object.keys(object).forEach(key => {
            callback(object[key], key, object);
        });
    }

    static deepEqual(a, b) {
        if (a === b) {
            return true;
        }

        if (typeof a === "object" && typeof b === "object") {
            let keysOfB = Object.keys(b);
            let childrenDeepEqual = Object.keys(a).every((key) => {
                let index = keysOfB.indexOf(key);
                if (index < 0) {
                    return false;
                }

                keysOfB.splice(index, 1);
                return ObjectHelper.deepEqual(a[key], b[key]);
            });
            return (childrenDeepEqual && keysOfB.length === 0);
        }
        return false;
    }

    /**
     * Testet, ob der übergebene Index am Objekt gesetzt ist. Werden mehrere Indexes übergeben, so wird getestet,
     * ob die "Index-Kette" gesetzt ist.
     * Bsp.:
     *  Helper.isSet({"index1":{"index2":value}}, "index1", "index2") ist wahr
     *
     * @param object
     * @param indexes
     * @returns {*}
     */
    static isSet(object, ...indexes) {
        if (Helper.isNotNull(object)) {
            if (indexes.length === 0) {
                return true;
            }
            return (ObjectHelper.isSet.apply(null, [object[indexes[0]]].concat(indexes.slice(1))));
        }
        return false;
    }

    static entries<T>(object: T){
        return Object.entries(object) as [keyof T, ValueOf<T>][]
    }

    static keys<T>(object: T){
        return Object.keys(object) as (keyof T)[]
    }
}
