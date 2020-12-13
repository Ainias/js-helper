export class PromiseWithHandlers<T> extends Promise<T> {
    private resolver: (value?: (PromiseLike<T> | T)) => void;
    private rejecter: (reason?: any) => void;

    constructor(executor?: (resolve: (value?: (PromiseLike<T> | T)) => void, reject: (reason?: any) => void) => void) {
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

    resolve(value ?: any) {
        if (this.resolver) {
            this.resolver(value);
        }
    }

    reject(value ?: any) {
        if (this.rejecter) {
            this.rejecter(value);
        }
    }
}