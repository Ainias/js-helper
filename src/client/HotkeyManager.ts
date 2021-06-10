export class HotkeyManager {
    _keys: any = {}
    _callbacks: any = {}

    _lastCallbackId = 0;

    _active = false;

    private ignoreFormElements: boolean;

    private mousePosition: { x: number, y: number } = null;

    constructor() {
        this._addListeners();
        this.ignoreFormElements = false;
    }

    private static isFormElement(element: EventTarget) {
        return element instanceof HTMLInputElement
            || element instanceof HTMLSelectElement
            || element instanceof HTMLTextAreaElement;
    }

    getMousePosition() {
        return this.mousePosition;
    }

    _addListeners() {
        window.addEventListener("keydown", e => {
            if (this.ignoreFormElements || !HotkeyManager.isFormElement(e.target)) {
                this._keys[e.key.toLowerCase()] = true;
                if (this._active) {
                    this._checkCallbacks(e);
                }
            }
        });
        window.addEventListener("keyup", e => {
            if (e.key) {
                this._keys[e.key.toLowerCase()] = false;
            }
        });
        document.addEventListener("mousemove", e => {
            this.mousePosition = {x: e.clientX, y: e.clientY};
        });
    }

    activate() {
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    addCallback(keys: string[], callback: (e) => void) {
        this._lastCallbackId++;
        this._callbacks[this._lastCallbackId] = {
            keys: keys,
            callback: callback
        }
    }

    isKeyPressed(key) {
        return this._active && this._keys[key] && this._keys[key] === true;
    }

    _checkCallbacks(e) {
        //TODO async forEach?
        Object.values(this._callbacks).forEach(callback => {
            // @ts-ignore
            if (callback.keys.every(key => this._keys[key] === true)) {
                // @ts-ignore
                callback.callback(e);
            }
        });
    }

    removeCallback(callbackId) {
        delete this._callbacks[callbackId];
    }
}
