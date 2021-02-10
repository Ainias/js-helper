import { DraggedElement } from "./DraggedElement";
export declare class DragHelper {
    private static instance;
    private startPosition?;
    private currentDraggedElement?;
    static getInstance(): DragHelper;
    private constructor();
    draggable(element: HTMLElement): DraggedElement;
    private dragStart;
    private dragMove;
    private dragStop;
}
