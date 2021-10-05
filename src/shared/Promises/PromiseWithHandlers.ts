export class PromiseWithHandlers<T> extends Promise<T> {
    private readonly resolver: (value?: (PromiseLike<T> | T)) => void;
    private readonly rejecter: (reason?: any) => void;

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

    resolve(value ?: (PromiseLike<T> | T)) {
        if (this.resolver) {
            this.resolver(value);
        }
    }

    reject(reason ?: any) {
        if (this.rejecter) {
            this.rejecter(reason);
        }
    }
}
