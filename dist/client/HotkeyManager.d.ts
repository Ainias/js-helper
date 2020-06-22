export declare class HotkeyManager {
    _keys: any;
    _callbacks: any;
    _lastCallbackId: number;
    _active: boolean;
    constructor();
    _addListeners(): void;
    activate(): void;
    deactivate(): void;
    addCallback(keys: any, callback: any): void;
    _checkCallbacks(e: any): void;
    removeCallback(callbackId: any): void;
}
