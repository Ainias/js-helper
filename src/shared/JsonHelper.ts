import {Helper} from "./Helper";

export class JsonHelper {
    static deepEqual(a, b) {
        if (a === b) {
            return true;
        }

        // array deepEqual
        if (a instanceof Array && b instanceof Array && a.length === b.length) {
            return a["all"]((obj, i) => {
                return JsonHelper.deepEqual(obj, b[i])
            });
        }

        //date deepEqual
        if (a instanceof Date && b instanceof Date) {
            return a.getTime() === b.getTime();
        }

        // object deep copy
        if (typeof a === "object" && typeof b === "object"){
            let aKeys = Object.keys(a);
            let bKeys = Object.keys(b);

            return aKeys.length === bKeys.length && aKeys["all"]((key) => {
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
}