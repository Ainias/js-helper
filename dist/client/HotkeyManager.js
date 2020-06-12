"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotkeyManager = void 0;
class HotkeyManager {
    constructor() {
        this._keys = {};
        this._callbacks = {};
        this._active = false;
        this._addListeners();
    }
    _addListeners() {
        window.addEventListener("keydown", e => {
            this._keys[e.key] = true;
            if (this._active) {
                this._checkCallbacks(e);
            }
        });
        window.addEventListener("keyup", e => {
            this._keys[e.key] = false;
        });
    }
    activate() {
        this._active = true;
    }
    deactivate() {
        this._active = false;
    }
    addCallback(keys, callback) {
        this._lastCallbackId++;
        this._callbacks[this._lastCallbackId] = {
            keys: keys,
            callback: callback
        };
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
exports.HotkeyManager = HotkeyManager;
//# sourceMappingURL=HotkeyManager.js.map