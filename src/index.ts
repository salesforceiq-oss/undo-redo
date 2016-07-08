///<reference path="../typings/index.d.ts" />

export default class UndoRedo {

    private _undoStack: any[];
    private _redoStack: any[];
    private _Z_KEY: number;

    constructor() {
        this._undoStack = [];
        this._redoStack = [];
        this._Z_KEY = 90;
    }

    public doUndo() {
        if (!!this._undoStack.length) {
            const undoObj = this._undoStack.pop();
            if (undoObj.undo && undoObj.undo() !== false) {
               this._redoStack.push(undoObj);
            }
        }
    }

    public doRedo() {
        if (!!this._redoStack.length) {
            const undoObj = this._redoStack.pop();
            if (undoObj.redo && undoObj.redo() !== false) {
                this._undoStack.push(undoObj);
            }
        }
    }

    public make(element: Element, preventKeys: boolean): void {
        element.addEventListener('keydown', function(event: KeyboardEvent) {
            if (preventKeys) {
                event.preventDefault();
                event.stopPropagation();
            }
            const key = event.keyCode || event.which;
            if (key === this._Z_KEY && (window.navigator.userAgent.match(/win/i) ? event.ctrlKey : event.metaKey)) {
                if (event.shiftKey) {
                    this.doRedo();
                } else {
                    this.doUndo();
                }
            }
        }.bind(this));
    }

    public addUndoObject(object: any): Function {
        this._redoStack = [];
        this._undoStack.push(object);
        return () => this._removeUndoObject(object);
    }

    private _removeUndoObject(handler: any) {
        const undoIndex = this._undoStack.indexOf(handler);
        const redoIndex = this._redoStack.indexOf(handler);
        if (undoIndex !== -1) {
            this._undoStack.splice(undoIndex, 1);
        }
        if (redoIndex !== -1) {
            this._undoStack.splice(redoIndex, 1);
        }
    }

    public clear() {
        this._undoStack = [];
        this._redoStack = [];
    }
}
