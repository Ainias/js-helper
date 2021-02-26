import {Helper} from "../shared/Helper";
import {ViewHelper} from "./ViewHelper";
import {type} from "os";

export class InputSelect {

    private inputElement: HTMLInputElement
    private options: Map<string, { value: string, label: string, selected: boolean }>;
    private onChangeListeners: ((changedOption: { value: string, label: string, selected: boolean }, inputSelect: InputSelect) => void)[] = [];

    private container: HTMLElement;
    private selectedOptionsContainer: HTMLElement;
    private optionsContainer: HTMLElement;

    constructor(element: string | HTMLInputElement, options: { value: string, label: string, selected?: boolean }[] | string[]) {
        if (typeof element === "string") {
            element = <HTMLInputElement>document.querySelector(element);
        }

        this.options = new Map<string, { value: string; label: string; selected: boolean }>();

        this.inputElement = element;
        options.forEach(o => {
            if (typeof o === "string") {
                o = {value: o, label: o};
            }

            o.selected = Helper.nonNull(o.selected, false);
            this.options.set(o.value, <{ value: string; label: string; selected: boolean }>o);
            return o;
        });
        this.buildElement();
    }

    onChange(listener) {
        this.onChangeListeners.push(listener);
    }

    private buildElement() {
        const parent = this.inputElement.parentElement;
        this.container = document.createElement("div");
        this.container.classList.add("input-select-container");

        const flexContainer = document.createElement("div");
        flexContainer.classList.add("input-select-flex");

        this.selectedOptionsContainer = document.createElement("span");
        this.selectedOptionsContainer.classList.add("input-select-selected-options");

        const classes = [];
        this.inputElement.classList.forEach(c => {
            this.container.classList.add(c);
            classes.push(c);
        })
        this.inputElement.classList.remove(...classes);

        this.inputElement.classList.add("input-select-input");

        this.optionsContainer = document.createElement("div");
        this.optionsContainer.classList.add("input-select-options");

        parent.insertBefore(this.container, this.inputElement);
        this.inputElement.remove();

        this.container.appendChild(flexContainer);
        this.container.appendChild(this.optionsContainer);

        flexContainer.appendChild(this.selectedOptionsContainer);
        flexContainer.appendChild(this.inputElement);
        this.inputElement.addEventListener("input", () => this.updateOptions())

        if ("ResizeObserver" in window) {
            // @ts-ignore
            const resizeObserver = new ResizeObserver(entries => {
                entries.forEach(entry => {
                    this.optionsContainer.style.width = entry.borderBoxSize[0].inlineSize + "px";
                })
            });
            resizeObserver.observe(this.container);
        }

        // if ("IntersectionObserver" in window) {
        //     const intersectionOptions = {
        //         root: this.optionsContainer,
        //         rootMargin: "20px",
        //         threshold: 0.01
        //     }
        //     const intersectionObserver = new IntersectionObserver((entries) => {
        //         entries.forEach(entry => console.log("is intersecting", entry.isIntersecting));
        //         // console.log("entries", entries);
        //     }, intersectionOptions);
        //     intersectionObserver.observe(flexContainer);
        // }

        window.addEventListener("scroll", () => console.log("scrolling"));
        this.container.addEventListener("click", () => {
            const rect = this.container.getBoundingClientRect();
            this.optionsContainer.style.top=(rect.top + rect.height)+"px";
        });

        this.updateOptions();
    }

    private updateOptions() {
        ViewHelper.removeAllChildren(this.selectedOptionsContainer);
        ViewHelper.removeAllChildren(this.optionsContainer);

        const inputValue = this.inputElement.value;
        this.options.forEach(o => {
            const optionElement = document.createElement("span");
            optionElement.classList.add("input-select-option");
            optionElement.dataset["value"] = o.value;
            optionElement.innerText = o.label;

            if (o.selected) {
                this.selectedOptionsContainer.appendChild(optionElement);
            } else if (o.label.indexOf(inputValue) !== -1) {
                this.optionsContainer.appendChild(optionElement);
            }

            optionElement.addEventListener("click", (e) => {
                e.stopPropagation();
                e.preventDefault();
                e.cancelBubble = true;
                this.toggle(o.value);
                this.inputElement.focus();
            })
        });
    }

    private toggle(value: string) {
        const option = this.options.get(value);
        if (option) {
            option.selected = !option.selected;
            this.updateOptions();
            this.onChangeListeners.forEach(listener => {
                listener(option, this);
            })
        }
    }

    getOptions() {
        return Array.from(this.options.values());
    }

    getSelectedOptions() {
        return this.getOptions().filter(o => o.selected);
    }

    getSelectedValues() {
        return this.getSelectedOptions().map(o => o.value);
    }

    updateSelection(selection: { [value: string]: boolean }) {
        Object.keys(selection).forEach(value => {
            const option = this.options.get(value);
            if (option) {
                option.selected = selection[value];
            }
        });
        this.updateOptions();
    }
}
