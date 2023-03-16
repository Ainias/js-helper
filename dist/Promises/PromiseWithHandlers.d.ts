export declare class PromiseWithHandlers<T> extends Promise<T> {
    private readonly resolver;
    private readonly rejecter;
    constructor(executor?: (resolve: (value?: (PromiseLike<T> | T)) => void, reject: (reason?: any) => void) => void);
    resolve(value?: (PromiseLike<T> | T)): void;
    reject(reason?: any): void;
}
