"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseWithHandlers = void 0;
class PromiseWithHandlers extends Promise {
    constructor(executor) {
        let resolver = null;
        let rejecter = null;
        super((res, rej) => {
            resolver = res;
            rejecter = rej;
            if (executor) {
                executor(resolver, rejecter);
            }
        });
        this.resolver = resolver;
        this.rejecter = rejecter;
    }
    resolve(value) {
        if (this.resolver) {
            this.resolver(value);
        }
    }
    reject(reason) {
        if (this.rejecter) {
            this.rejecter(reason);
        }
    }
}
exports.PromiseWithHandlers = PromiseWithHandlers;
//# sourceMappingURL=PromiseWithHandlers.js.map