///<reference path="../typings/index.d.ts" />
declare var require: NodeRequire;

let undoRedoStack = require('../.src').default;
undoRedoStack.make(document.body, true);

document.body.addEventListener('click', function(e) {
    if ((<Element>e.target).getAttribute('id') === 'newElBtn') {
        let el = document.createElement('div');
        el.setAttribute('class', 'zElement');
        document.body.appendChild(el);

        let object ={
            undo: () => {
                document.body.removeChild(el);
                return true;
            },
            redo: () => {
                document.body.appendChild(el);
                return true;
            }
        }
        undoRedoStack.addUndoObject(object);
    }
});
