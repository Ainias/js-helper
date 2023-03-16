import {Helper} from "./Helper";

export class Counter{
    private _value: number = 0;

    constructor(value?) {

        if (value instanceof Counter){
            value = value.current;
        }

        this._value = Helper.nonNull(value, 0);
    }

    next(){
        this._value++;
        return this._value;
    }

    current(){
        return this._value;
    }
}