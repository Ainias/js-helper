export declare class InputSelect {
    private inputElement;
    private options;
    private onChangeListeners;
    private container;
    private selectedOptionsContainer;
    private optionsContainer;
    constructor(element: string | HTMLInputElement, options: {
        value: string;
        label: string;
        selected?: boolean;
    }[] | string[]);
    onChange(listener: any): void;
    private buildElement;
    private updateOptions;
    private toggle;
    getOptions(): {
        value: string;
        label: string;
        selected: boolean;
    }[];
    getSelectedOptions(): {
        value: string;
        label: string;
        selected: boolean;
    }[];
    getSelectedValues(): string[];
    updateSelection(selection: {
        [value: string]: boolean;
    }): void;
}
