export declare class PromiseWithHandlers<T> extends Promise<T> {
    private resolver;
    private rejecter;
    constructor(executor?: (resolve: (value?: (PromiseLike<T> | T)) => void, reject: (reason?: any) => void) => void);
    resolve(value?: any): void;
    reject(value?: any): void;
}
