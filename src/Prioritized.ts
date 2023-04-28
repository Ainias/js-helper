import {Helper} from "./Helper";

export class Prioritized {

    _promises: {};
    _lastPriority: number = 0;
    _callbacks: any;
    _status = 0;
    _lastResult = null;
    _success = {};
    _highestPromise = null;

    constructor(promises?: Promise<any>[]|Record<number, Promise<any>>) {
        promises = Helper.nonNull(promises, {});

        this._callbacks = [];
        if (Array.isArray(promises)) {
            let tmpPromises: Record<number, Promise<any>> = {};
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
                    } else {
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
            if (Helper.isNull(this._success[priority])) {
                //return true beendet some-schleife
                return true;
            } else if (this._success[priority] === true) {
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

    async highest(funcOrPromise?) {
        await this._highestPromise;
        if (Helper.isNotNull(funcOrPromise)) {
            return Promise.resolve(this._lastResult).then(funcOrPromise);
        } else {
            return Promise.resolve(this._lastResult);
        }
    }

    async first(funcOrPromise?) {
        if (this._status === 0) {
            if (Helper.isNotNull(funcOrPromise)) {
                return Promise.race(Object["values"](this._promises)).then(funcOrPromise);
            } else {
                return Promise.race(Object["values"](this._promises));
            }
        }
        else {
            return Promise.resolve(this._lastResult);
        }
    }
}
