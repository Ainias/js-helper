/**
 * Eine Klasse mit häufig genutzten, nützlichen Funktionen
 */
import {JsonHelper} from "./JsonHelper";

declare let device: any;

export class Helper {
    /**
     * Testet, ob eine Variable null oder Undefined ist
     *
     * @param variable
     * @returns {boolean}
     */
    static isNull(variable) {
        return (variable === null || variable === undefined);
    }

    /**
     * Testet, ob eine Variable nicht (null oder undefined) ist
     *
     * @param variable
     * @returns {boolean}
     */
    static isNotNull(variable) {
        return !Helper.isNull(variable);
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
            return (Helper.isSet.apply(null, [object[indexes[0]]].concat(indexes.slice(1))));
        }
        return false;
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

    static arrayToObject(array, indexFunction){
        let obj = {};
        array.forEach(val => {
            obj[indexFunction(val)] = val;
        });
        return obj;
    }

    /**
     * Deepcopies JSON
     *
     * @param obj
     * @returns {*}
     */
    static cloneJson(obj) {
       return JsonHelper.deepCopy(obj)
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

    static shuffleArray(array) {
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

    static padZero(n, width?, z?) {
        z = Helper.nonNull(z, '0');
        n = n + '';
        width = Helper.nonNull(width, 1);
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
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
                return Helper.deepEqual(a[key], b[key]);
            });
            return (childrenDeepEqual && keysOfB.length === 0);
        }
        return false;
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

    static async asyncForEach(array, callback, runAsyncronous?) {
        runAsyncronous = Helper.nonNull(runAsyncronous, false);

        let validPromises = [];
        for (let i = 0; i < array.length; i++) {
            let index = i;
            let currentPromise = Promise.resolve(callback(array[index], index, array));
            if (!runAsyncronous) {
                await currentPromise;
            }
            validPromises.push(currentPromise);
        }
        return Promise.all(validPromises);
    }

    static escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
    }

    static objectForEach(object, callback) {
        Object.keys(object).forEach(key => {
            callback(object[key], key, object);
        });
    }

    static toArray(object) {
        let res = [];
        for (let k in object) {
            res.push(object[k]);
        }
        return res;
    }

    static imageUrlIsEmpty(url){
        return (Helper.isNull(url) || url.trim() === "" || url.trim() === "data:")
    }

    static newPromiseWithResolve() {
        let resolver = null;
        let rejecter = null;

        let promise = new Promise((resolve, reject) => {
            resolver = resolve;
            rejecter = reject;
        });
        promise["resolve"] = resolver;
        promise["reject"] = rejecter;

        return promise;
    }

    static isMobileApp(){
        return (typeof device !== "undefined" && device.platform !== "browser")
    }
}
