"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputSelect = void 0;
const Helper_1 = require("../shared/Helper");
const ViewHelper_1 = require("./ViewHelper");
class InputSelect {
    constructor(element, options) {
        this.onChangeListeners = [];
        if (typeof element === "string") {
            element = document.querySelector(element);
        }
        this.options = new Map();
        this.inputElement = element;
        options.forEach(o => {
            if (typeof o === "string") {
                o = { value: o, label: o };
            }
            o.selected = Helper_1.Helper.nonNull(o.selected, false);
            this.options.set(o.value, o);
            return o;
        });
        this.buildElement();
    }
    onChange(listener) {
        this.onChangeListeners.push(listener);
    }
    buildElement() {
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
        });
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
        if ("ResizeObserver" in window) {
            // @ts-ignore
            const resizeObserver = new ResizeObserver(entries => {
                entries.forEach(entry => {
                    this.optionsContainer.style.width = entry.borderBoxSize[0].inlineSize + "px";
                });
            });
            resizeObserver.observe(this.container);
        }
        this.inputElement.addEventListener("input", () => this.updateOptions());
        this.updateOptions();
    }
    updateOptions() {
        ViewHelper_1.ViewHelper.removeAllChildren(this.selectedOptionsContainer);
        ViewHelper_1.ViewHelper.removeAllChildren(this.optionsContainer);
        const inputValue = this.inputElement.value;
        this.options.forEach(o => {
            const optionElement = document.createElement("span");
            optionElement.classList.add("input-select-option");
            optionElement.dataset["value"] = o.value;
            optionElement.innerText = o.label;
            if (o.selected) {
                this.selectedOptionsContainer.appendChild(optionElement);
            }
            else if (o.label.indexOf(inputValue) !== -1) {
                this.optionsContainer.appendChild(optionElement);
            }
            optionElement.addEventListener("click", (e) => {
                e.stopPropagation();
                e.preventDefault();
                e.cancelBubble = true;
                this.toggle(o.value);
            });
        });
    }
    toggle(value) {
        const option = this.options.get(value);
        if (option) {
            option.selected = !option.selected;
            this.updateOptions();
            this.onChangeListeners.forEach(listener => {
                listener(option, this);
            });
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
}
exports.InputSelect = InputSelect;
//# sourceMappingURL=InputSelect.js.map