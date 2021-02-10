import {DraggedElement} from "./DraggedElement";

export class DragHelper {

    private static instance: DragHelper;

    private startPosition?: { x: number, y: number } = null;
    private currentDraggedElement?: DraggedElement = null;

    static getInstance() {
        if (!this.instance) {
            this.instance = new DragHelper();
        }
        return this.instance;
    }

    private constructor() {
        window.addEventListener("mousemove", e => {
            if (this.currentDraggedElement) {
                this.dragMove({x: e.clientX, y: e.clientY});
            }
        });
        window.addEventListener("touchmove", e => {
            if (this.currentDraggedElement) {
                this.dragMove({x: e.touches[0].clientX, y: e.touches[0].clientY});
            }
        })
        window.addEventListener("mouseup", e => {
            if (e.button === 0) {
                this.dragStop({x: e.clientX, y: e.clientY});
            }
        });
        window.addEventListener("touchend", e => {
            if (e.touches.length === 0) {
                this.dragStop({x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY});
            }
        });
    }

    draggable(element: HTMLElement) {
        const dragElement = new DraggedElement(element);
        element.addEventListener("mousedown", e => {
            e.preventDefault();
            console.log("mousedown", e.button);
            if (e.button === 0) {
                this.dragStart({x: e.clientX, y: e.clientY}, dragElement);
            }
        });
        element.addEventListener("touchstart", e => {
            e.preventDefault();
            if (e.touches.length === 1) {
                this.dragStart({x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY}, dragElement);
            }
        });


        return dragElement;
    }

    private dragStart(position: { x: number, y: number }, draggedElement: DraggedElement) {
        this.currentDraggedElement = draggedElement;
        this.startPosition = position;
        this.currentDraggedElement.start();
    }

    private dragMove(toPosition: { x: number, y: number }) {
        if (this.currentDraggedElement) {
            const diff = {x: toPosition.x - this.startPosition.x, y: toPosition.y - this.startPosition.y}
            this.currentDraggedElement.moveRelativeTo(diff);
        }
    }

    private dragStop(mousePos: { x: number, y: number }) {
        if (this.currentDraggedElement) {
            this.currentDraggedElement.stop(mousePos);
            this.currentDraggedElement = null;
            this.startPosition = null;
        }
    }
}
