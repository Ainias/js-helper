export declare class HotkeyManager {
    _keys: any;
    _callbacks: any;
    _lastCallbackId: number;
    _active: boolean;
    private ignoreFormElements;
    private mousePosition;
    constructor();
    private static isFormElement;
    getMousePosition(): {
        x: number;
        y: number;
    };
    _addListeners(): void;
    activate(): void;
    deactivate(): void;
    addCallback(keys: any, callback: any): void;
    isKeyPressed(key: any): boolean;
    _checkCallbacks(e: any): void;
    removeCallback(callbackId: any): void;
}
