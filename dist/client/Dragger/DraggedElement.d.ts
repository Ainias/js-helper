export declare class DraggedElement {
    private startListener?;
    private stopListener?;
    private moveListener?;
    private isDragging;
    private readonly element;
    private previewElement;
    private startPosition;
    constructor(element: HTMLElement);
    onStart(listener: (element: HTMLElement) => void): this;
    onStop(listener: (element: HTMLElement, goal: HTMLElement) => void): this;
    onMove(listener: (element: HTMLElement) => void): this;
    start(): void;
    stop(mousePosition: {
        x: number;
        y: number;
    }): void;
    private moved;
    moveRelativeTo(relativePos: {
        x: number;
        y: number;
    }): void;
}
