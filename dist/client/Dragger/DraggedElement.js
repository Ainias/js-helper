"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DraggedElement = void 0;
class DraggedElement {
    constructor(element) {
        this.isDragging = false;
        this.element = element;
    }
    onStart(listener) {
        this.startListener = listener;
        return this;
    }
    onStop(listener) {
        this.stopListener = listener;
        return this;
    }
    onMove(listener) {
        this.moveListener = listener;
        return this;
    }
    start() {
        this.isDragging = true;
        if (!this.previewElement) {
            this.previewElement = this.element.cloneNode(true);
            const styles = getComputedStyle(this.element);
            for (let i = 0; i < styles.length; i++) {
                this.previewElement.style[styles[i]] = styles.getPropertyValue(styles[i]);
            }
            this.previewElement.style.opacity = "0.6";
            this.previewElement.style.position = "fixed";
        }
        const boundingRect = this.element.getBoundingClientRect();
        this.startPosition = { x: boundingRect.left, y: boundingRect.top };
        this.previewElement.style.top = boundingRect.top + "px";
        this.previewElement.style.left = boundingRect.left + "px";
        this.previewElement.style.width = (boundingRect.right - boundingRect.left) + "px";
        this.previewElement.style.height = (boundingRect.bottom - boundingRect.top) + "px";
        document.body.appendChild(this.previewElement);
        if (this.startListener) {
            this.startListener(this.element);
        }
    }
    stop(mousePosition) {
        this.isDragging = false;
        if (this.previewElement) {
            this.previewElement.remove();
        }
        const droppedAt = document.elementFromPoint(mousePosition.x, mousePosition.y);
        if (this.stopListener) {
            this.stopListener(this.element, droppedAt);
        }
    }
    moved() {
        if (this.isDragging && this.moveListener) {
            this.moveListener(this.element);
        }
    }
    moveRelativeTo(relativePos) {
        if (this.startPosition && this.previewElement) {
            const newPosition = { x: this.startPosition.x + relativePos.x, y: this.startPosition.y + relativePos.y };
            this.previewElement.style.left = newPosition.x + "px";
            this.previewElement.style.top = newPosition.y + "px";
            this.moved();
        }
    }
}
exports.DraggedElement = DraggedElement;
//# sourceMappingURL=DraggedElement.js.map