"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
/**
 * Eine Klasse mit häufig genutzten, nützlichen Funktionen
 */
const JsonHelper_1 = require("./JsonHelper");
const ArrayHelper_1 = require("./ArrayHelper");
const PromiseWithHandlers_1 = require("./Promises/PromiseWithHandlers");
const ObjectHelper_1 = require("./ObjectHelper");
class Helper {
    /**
     * Testet, ob eine Variable null oder Undefined ist
     *
     * @param variable
     * @returns {boolean}
     */
    static isNull(variable) {
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
    static isNotNull(variable) {
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
    static delay(duration, args) {
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
    static nonNull(val1, val2, ...args) {
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
        return (Helper.isNull(value) || (typeof value === 'string' && value.trim() === ""));
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
    /**
     * @deprecated Use ArrayHelper.arrayToObject instead
     *
     * @param array
     * @param indexFunction
     */
    static arrayToObject(array, indexFunction) {
        return ArrayHelper_1.ArrayHelper.arrayToObject(array, indexFunction);
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
    static padZero(n, width, z) {
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
        return (Helper.isNull(url) || url.trim() === "" || url.trim() === "data:");
    }
    static isMobileApp() {
        return (typeof window["device"] !== "undefined" && window["device"].platform !== "browser");
    }
    static isIOS() {
        return (typeof window["device"] !== "undefined" && window["device"].platform === "iOS");
    }
    static toSnakeCase(camelCase) {
        return camelCase.replace(/([A-Z])/g, function (find, something, position) {
            return ((position > 0) ? "_" : "") + find[0].toLowerCase();
        });
    }
    static wait(timeout, result) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(r => {
                setTimeout(() => {
                    r(result);
                }, timeout);
            });
        });
    }
    static timeout(time, otherPromise, timeoutResult) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.race([otherPromise, Helper.wait(time).then(() => {
                    if (timeoutResult === undefined) {
                        return Promise.reject();
                    }
                    else {
                        return timeoutResult;
                    }
                })]);
        });
    }
    static execNonThrow(fn) {
        return (...args) => {
            try {
                const res = fn(...args);
                if (res instanceof Promise) {
                    res.catch(e => console.error(e));
                }
                return res;
            }
            catch (e) {
                console.error(e);
            }
        };
    }
    /** @deprecated Use ArrayHelper.shuffle instead */
    static shuffleArray(array) {
        return ArrayHelper_1.ArrayHelper.shuffle(array);
    }
    /** @deprecated use ArrayHelper.reverseForEach instead */
    static reverseForEach(array, callback) {
        return ArrayHelper_1.ArrayHelper.reverseForEach(array, callback);
    }
    /** @deprecated use ArrayHelper.asyncForEach instead */
    static asyncForEach(array, callback, runAsynchronous) {
        return __awaiter(this, void 0, void 0, function* () {
            return ArrayHelper_1.ArrayHelper.asyncForEach(array, callback, runAsynchronous);
        });
    }
    /** @deprecated use ObjectHelper.objectForEach instead */
    static objectForEach(object, callback) {
        return ObjectHelper_1.ObjectHelper.objectForEach(object, callback);
    }
    /** @deprecated use ObjectHelper.toArray instead */
    static toArray(object) {
        return ObjectHelper_1.ObjectHelper.toArray(object);
    }
    /** @deprecated Use ObjectHelper.deepEqual instead */
    static deepEqual(a, b) {
        return ObjectHelper_1.ObjectHelper.deepEqual(a, b);
    }
    /**
     * @deprecated Use ObjectHelper.invertKeyValues instead
     *
     * Inverts the key-Values for an object
     * @param obj
     * @return {*}
     */
    static invertKeyValues(obj) {
        return ObjectHelper_1.ObjectHelper.invertKeyValues(obj);
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
        return ObjectHelper_1.ObjectHelper.isSet(object, ...indexes);
    }
    /** @deprecated use PromiseWithHandlers instead */
    static newPromiseWithResolve() {
        return new PromiseWithHandlers_1.PromiseWithHandlers();
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
        return JsonHelper_1.JsonHelper.deepCopy(obj);
    }
}
exports.Helper = Helper;
//# sourceMappingURL=Helper.js.map