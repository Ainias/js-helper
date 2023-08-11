"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectHelper = void 0;
const Helper_1 = require("./Helper");
class ObjectHelper {
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
        if (Helper_1.Helper.isNotNull(object)) {
            if (indexes.length === 0) {
                return true;
            }
            return (ObjectHelper.isSet.apply(null, [object[indexes[0]]].concat(indexes.slice(1))));
        }
        return false;
    }
    static entries(object, filterUndefined) {
        const entries = Object.entries(object);
        if (filterUndefined !== false) {
            return entries.filter(([, val]) => val !== undefined);
        }
        return entries;
    }
    static values(object, filterUndefined) {
        const entries = Object.values(object);
        if (filterUndefined !== false) {
            return entries.filter((val) => val !== undefined);
        }
        return entries;
    }
    static keys(object) {
        return Object.keys(object);
    }
}
exports.ObjectHelper = ObjectHelper;
//# sourceMappingURL=ObjectHelper.js.map