"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counter = void 0;
const Helper_1 = require("./Helper");
class Counter {
    constructor(value) {
        this._value = 0;
        if (value instanceof Counter) {
            value = value.current;
        }
        this._value = Helper_1.Helper.nonNull(value, 0);
    }
    next() {
        this._value++;
        return this._value;
    }
    current() {
        return this._value;
    }
}
exports.Counter = Counter;
//# sourceMappingURL=Counter.js.map