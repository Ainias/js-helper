import {Helper} from "./Helper";
import {ExcludeUndefined, URecord, ValueOf} from "./TypeHelper";

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

    static entries<T extends URecord<any, any>, B extends boolean = true>(object: T, filterUndefined?: B): B extends false ? [keyof T, ValueOf<T>][] : [keyof T, ExcludeUndefined<ValueOf<T>>][]{
        const entries = Object.entries(object) as [keyof T, ValueOf<T>][];
        if (filterUndefined !== false){
            return entries.filter(([, val]) => val !== undefined);
        }
        return entries
    }

    static values<T extends URecord<any, any>, B extends boolean = true>(object: T, filterUndefined?: B): B extends false ? ValueOf<T>[] : ExcludeUndefined<ValueOf<T>>[]{
        const entries = Object.values(object) as ValueOf<T>[];
        if (filterUndefined !== false){
            return entries.filter(( val) => val !== undefined);
        }
        return entries
    }

    static keys<T extends URecord<any, any>>(object: T){
        return Object.keys(object) as (keyof T)[]
    }
}
