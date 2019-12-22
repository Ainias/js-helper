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
const Helper_1 = require("./Helper");
class Prioritized {
    constructor(promises) {
        this._lastPriority = 0;
        this._status = 0;
        this._lastResult = null;
        this._success = {};
        this._highestPromise = null;
        promises = Helper_1.Helper.nonNull(promises, {});
        this._callbacks = [];
        if (Array.isArray(promises)) {
            let tmpPromises = {};
            promises.forEach((promise, i) => {
                tmpPromises[(i + 1) * 10] = promise;
            });
            promises = tmpPromises;
        }
        let highestPromiseResolver = null;
        this._highestPromise = new Promise(resolve => {
            highestPromiseResolver = resolve;
        });
        Object.keys(promises).forEach(priority => {
            this._success[priority] = null;
            promises[priority].then(res => {
                this._success[priority] = true;
                if (parseInt(priority) > this._lastPriority) {
                    this._lastResult = res;
                    this._lastPriority = parseInt(priority);
                    this._callCallbacks();
                    if (this._checkHighest()) {
                        this._status = 2;
                        highestPromiseResolver();
                    }
                    else {
                        this._status = 1;
                    }
                }
            }).catch(e => {
                this._success[priority] = e;
                if (this._checkHighest()) {
                    this._status = 2;
                    highestPromiseResolver();
                }
            });
        });
        this._promises = promises;
    }
    _callCallbacks() {
        this._callbacks.forEach(callback => {
            callback(this._lastResult, this._lastPriority);
        });
    }
    _checkHighest() {
        let isHighestResult = false;
        Object.keys(this._success).reverse().some(priority => {
            if (Helper_1.Helper.isNull(this._success[priority])) {
                //return true beendet some-schleife
                return true;
            }
            else if (this._success[priority] === true) {
                isHighestResult = true;
                return true;
            }
        });
        return isHighestResult;
    }
    do(callback) {
        if (this._status < 2) {
            this._callbacks.push(callback);
        }
        if (this._status > 0) {
            callback(this._lastResult, this._lastPriority);
        }
    }
    highest(funcOrPromise) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._highestPromise;
            if (Helper_1.Helper.isNotNull(funcOrPromise)) {
                return Promise.resolve(this._lastResult).then(funcOrPromise);
            }
            else {
                return Promise.resolve(this._lastResult);
            }
        });
    }
    first(funcOrPromise) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._status === 0) {
                if (Helper_1.Helper.isNotNull(funcOrPromise)) {
                    return Promise.race(Object["values"](this._promises)).then(funcOrPromise);
                }
                else {
                    return Promise.race(Object["values"](this._promises));
                }
            }
            else {
                return Promise.resolve(this._lastResult);
            }
        });
    }
}
exports.Prioritized = Prioritized;
//# sourceMappingURL=Prioritized.js.map