export declare class Prioritized {
    _promises: {};
    _lastPriority: number;
    _callbacks: any;
    _status: number;
    _lastResult: any;
    _success: {};
    _highestPromise: any;
    constructor(promises?: Promise<any>[] | Record<number, Promise<any>>);
    _callCallbacks(): void;
    _checkHighest(): boolean;
    do(callback: any): void;
    highest(funcOrPromise?: any): Promise<any>;
    first(funcOrPromise?: any): Promise<any>;
}
