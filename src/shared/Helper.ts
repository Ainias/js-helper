/**
 * Eine Klasse mit häufig genutzten, nützlichen Funktionen
 */
import {JsonHelper} from "./JsonHelper";
import {ArrayHelper} from "./ArrayHelper";
import {PromiseWithHandlers} from "./Promises/PromiseWithHandlers";
import {ObjectHelper} from "./ObjectHelper";

export class Helper {
    /**
     * Testet, ob eine Variable null oder Undefined ist
     *
     * @param variable
     * @returns {boolean}
     */
    static isNull<T>(variable: T|null|undefined): variable is null|undefined {
        return Helper.isAllNull(variable);
    }

    static isAllNull(...args) {
        for (let i = 0; i < args.length; i++) {
            if (!(args[i] === null || args[i] === undefined)) {
                return false;
            }
        }
        return true;
    }

    static isAtLeastOneNull(...args) {
        return !Helper.isAllNull(...args);
    }

    /**
     * Testet, ob eine Variable nicht (null oder undefined) ist
     *
     * @param variable
     * @returns {boolean}
     */
    static isNotNull<T>(variable:T): variable is Exclude<T, null | undefined>{
        return Helper.isAllNotNull(variable);
    }

    static isAllNotNull(...args) {
        for (let i = 0; i < args.length; i++) {
            if ((args[i] === null || args[i] === undefined)) {
                return false;
            }
        }
        return true;
    }

    static isAtLeastOneNotNull(...args) {
        return !Helper.isAllNull(...args);
    }

    static delay<ResultType>(duration: number, args?: ResultType): Promise<ResultType>{
        return new Promise(resolve => setTimeout(() => resolve(args), duration));
    }

    /**
     * Gibt den ersten übergebenen Wert, der nicht (null oder undefined) ist, zurück
     *
     * @param val1
     * @param val2
     * @param args
     * @returns {*}
     */
    static nonNull(val1, val2?, ...args) {
        for (let i = 0; i < arguments.length; i++) {
            if (Helper.isNotNull(arguments[i])) {
                return arguments[i];
            }
        }
        return null;
    }

    /**
     * Testet, ob ein Wert null oder Leerstring, bzw nur aus leerzeichend bestehender String ist
     *
     * @param value
     * @returns {boolean}
     */
    static empty(value) {
        return (Helper.isNull(value) || (typeof value === 'string' && value.trim() === ""))
    }

    /**
     * Testet, ob ein Wert NICHT (null oder Leerstring, bzw nur aus leerzeichend bestehender String ist)
     *
     * @param value
     * @returns {boolean}
     */
    static notEmpty(value) {
        return !Helper.empty(value);
    }

    static arrayToObject<ArrayType = any>(array: ArrayType[], indexFunction: (arrayObj: ArrayType) => string|number) {
        let obj: {[key in string | number]: ArrayType} = {};
        array.forEach(val => {
            obj[indexFunction(val)] = val;
        });
        return obj;
    }

    /**
     * Erstellt ein FormData-Object von JSON-Data. Nützlich für fetch
     *
     * @param obj
     * @returns {FormData}
     */
    static formDataFromObject(obj) {
        let formData = new FormData();
        for (let k in obj) {
            formData.set(k, obj[k]);
        }
        return formData;
    }

    static padZero(n, width?, z?) {
        z = Helper.nonNull(z, '0');
        n = n + '';
        width = Helper.nonNull(width, 1);
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    //Ältere evtl nützliche Funktionen
    static htmlspecialcharsDecode(text) {
        const map = {
            '&amp;': '&',
            '&#038;': "&",
            '&lt;': '<',
            '&gt;': '>',
            '&quot;': '"',
            '&#039;': "'",
            '&#8217;': "’",
            '&#8216;': "‘",
            '&#8211;': "–",
            '&#8212;': "—",
            '&#8230;': "…",
            '&#8221;': '”'
        };

        if (Helper.isNotNull(text) && typeof text.replace === "function") {
            return text.replace(/\&[\w\d\#]{2,5}\;/g, function (m) {
                return map[m];
            });
        }
        return text;
    }

    static escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
    }

    static imageUrlIsEmpty(url) {
        return (Helper.isNull(url) || url.trim() === "" || url.trim() === "data:")
    }

    static isMobileApp() {
        return (typeof window["device"] !== "undefined" && window["device"].platform !== "browser")
    }

    static isIOS() {
        return (typeof window["device"] !== "undefined" && window["device"].platform === "iOS")
    }

    static toSnakeCase(camelCase) {
        return camelCase.replace(/([A-Z])/g, function (find, something, position) {
            return ((position > 0) ? "_" : "") + find[0].toLowerCase();
        });
    }

    static async wait(timeout, result?) {
        return new Promise(r => {
            setTimeout(() => {
                r(result);
            }, timeout);
        })
    }

    static async timeout(time, otherPromise, timeoutResult?) {
        return Promise.race([otherPromise, Helper.wait(time).then(() => {
            if (timeoutResult === undefined) {
                return Promise.reject();
            } else {
                return timeoutResult
            }
        })])
    }

    static execNonThrow(fn: (...any: any) => any){
        return (...args) => {
            try {
                const res = fn(...args);
                if (res instanceof Promise){
                    res.catch(e => console.error(e));
                }
                return res;
            }
            catch(e){
                console.error(e);
            }
        }
    }

    /** @deprecated Use ArrayHelper.shuffle instead */
    static shuffleArray(array) {
        return ArrayHelper.shuffle(array);
    }


    /** @deprecated use ArrayHelper.reverseForEach instead */
    static reverseForEach<ArrayType = any>(array: ArrayType[], callback: (element: ArrayType, index: number) => any){
        return ArrayHelper.reverseForEach(array, callback);
    }

    /** @deprecated use ArrayHelper.asyncForEach instead */
    static async asyncForEach(array, callback, runAsynchronous?) {
        return ArrayHelper.asyncForEach(array, callback, runAsynchronous)
    }


    /** @deprecated use ObjectHelper.objectForEach instead */
    static objectForEach(object, callback) {
        return ObjectHelper.objectForEach(object, callback);
    }

    /** @deprecated use ObjectHelper.toArray instead */
    static toArray(object) {
        return ObjectHelper.toArray(object)
    }

    /** @deprecated Use ObjectHelper.deepEqual instead */
    static deepEqual(a, b) {
        return ObjectHelper.deepEqual(a, b);
    }

    /**
     * @deprecated Use ObjectHelper.invertKeyValues instead
     *
     * Inverts the key-Values for an object
     * @param obj
     * @return {*}
     */
    static invertKeyValues(obj) {
        return ObjectHelper.invertKeyValues(obj);
    }

    /**
     * @deprecated Use ObjectHelper.isSet instead
     *
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
        return ObjectHelper.isSet(object, ...indexes);
    }

    /** @deprecated use PromiseWithHandlers instead */
    static newPromiseWithResolve() {
        return new PromiseWithHandlers();
    }

    /**
     * @deprecated Use JsonHelper.deepCopy instead
     *
     * Deepcopies JSON
     *
     * @param obj
     * @returns {*}
     */
    static cloneJson(obj) {
        return JsonHelper.deepCopy(obj)
    }

}
