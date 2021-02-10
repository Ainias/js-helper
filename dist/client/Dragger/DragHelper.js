"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragHelper = void 0;
const DraggedElement_1 = require("./DraggedElement");
class DragHelper {
    constructor() {
        this.startPosition = null;
        this.currentDraggedElement = null;
        window.addEventListener("mousemove", e => {
            if (this.currentDraggedElement) {
                this.dragMove({ x: e.clientX, y: e.clientY });
            }
        });
        window.addEventListener("touchmove", e => {
            if (this.currentDraggedElement) {
                this.dragMove({ x: e.touches[0].clientX, y: e.touches[0].clientY });
            }
        });
        window.addEventListener("mouseup", e => {
            if (e.button === 0) {
                this.dragStop({ x: e.clientX, y: e.clientY });
            }
        });
        window.addEventListener("touchend", e => {
            if (e.touches.length === 0) {
                this.dragStop({ x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY });
            }
        });
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new DragHelper();
        }
        return this.instance;
    }
    draggable(element) {
        const dragElement = new DraggedElement_1.DraggedElement(element);
        element.addEventListener("mousedown", e => {
            e.preventDefault();
            console.log("mousedown", e.button);
            if (e.button === 0) {
                this.dragStart({ x: e.clientX, y: e.clientY }, dragElement);
            }
        });
        element.addEventListener("touchstart", e => {
            e.preventDefault();
            if (e.touches.length === 1) {
                this.dragStart({ x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY }, dragElement);
            }
        });
        return dragElement;
    }
    dragStart(position, draggedElement) {
        this.currentDraggedElement = draggedElement;
        this.startPosition = position;
        this.currentDraggedElement.start();
    }
    dragMove(toPosition) {
        if (this.currentDraggedElement) {
            const diff = { x: toPosition.x - this.startPosition.x, y: toPosition.y - this.startPosition.y };
            this.currentDraggedElement.moveRelativeTo(diff);
        }
    }
    dragStop(mousePos) {
        if (this.currentDraggedElement) {
            this.currentDraggedElement.stop(mousePos);
            this.currentDraggedElement = null;
            this.startPosition = null;
        }
    }
}
exports.DragHelper = DragHelper;
//# sourceMappingURL=DragHelper.js.map