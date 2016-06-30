///<reference path="../typings/index.d.ts" />
declare var require: NodeRequire;

import test = require('tape');
import UndoRedo from './'

interface CountObj {
    undoCount: number;
    redoCount: number;
}

function createObject(object: CountObj) {
    const obj = {
        undo: () => {
            object.undoCount++;
            return true;
        },
        redo: () => {
            object.redoCount++;
            return true;
        }
    };
    return obj;
}

function undo(undoRedo: UndoRedo, numTimes: number = 1) {
    for (let i = 0; i < numTimes; i++) {
        undoRedo.doUndo();
    }
}

function redo(undoRedo: UndoRedo, numTimes: number = 1) {
    for (let i = 0; i < numTimes; i++) {
        undoRedo.doRedo();
    }
}

function addUndo(undoRedo: UndoRedo, obj: Object, numTimes: number = 1) {
    for (let i = 0; i < numTimes; i++) {
        undoRedo.addUndoObject(obj);
    }
}

test(`should call both doUndo() and doRedo() 1 time`, t => {
    const undoRedoStack = new UndoRedo();
    const countObj = {
        undoCount: 0,
        redoCount: 0
    };
    addUndo(undoRedoStack, createObject(countObj));
    undo(undoRedoStack);
    redo(undoRedoStack);
    t.equal(countObj.undoCount, 1);
    t.equal(countObj.redoCount, 1);
    t.end();
});

test(`should call doUndo() 3 times and doRedo() 1 time`, t => {
    const undoRedoStack = new UndoRedo();
    const countObj = {
        undoCount: 0,
        redoCount: 0
    };
    const obj = createObject(countObj);
    addUndo(undoRedoStack, obj, 3);
    undo(undoRedoStack, 3);
    redo(undoRedoStack);
    t.equal(countObj.undoCount, 3);
    t.equal(countObj.redoCount, 1);
    t.end();
});

test(`should successfully call doUndo() 3 times even though it is called 4 times`, t => {
    const undoRedoStack = new UndoRedo();
    const countObj = {
        undoCount: 0,
        redoCount: 0
    };
    const obj = createObject(countObj);
    addUndo(undoRedoStack, obj, 3);
    undo(undoRedoStack, 4);
    t.equal(countObj.undoCount, 3);
    t.end();
});

test(`should call doUndo() and doRedo() 0 times because nothing added to stacks at the start`, t => {
    const undoRedoStack = new UndoRedo();
    const countObj = {
        undoCount: 0,
        redoCount: 0
    };
    undo(undoRedoStack, 4);
    redo(undoRedoStack, 2);
    t.equal(countObj.undoCount, 0);
    t.equal(countObj.redoCount, 0);
    t.end();
});

test(`should call doUndo() 4 times and doRedo() 3 times`, t => {
    const undoRedoStack = new UndoRedo();
    const countObj = {
        undoCount: 0,
        redoCount: 0
    };
    const obj = createObject(countObj);
    addUndo(undoRedoStack, obj, 3);
    undo(undoRedoStack);
    redo(undoRedoStack, 2);
    undo(undoRedoStack, 3);
    redo(undoRedoStack, 2);
    t.equal(countObj.undoCount, 4);
    t.equal(countObj.redoCount, 3);
    t.end();
});

test(`should call doUndo() and doRedo() 0 times since function added is called first`, t => {
    const undoRedoStack = new UndoRedo();
    const countObj = {
        undoCount: 0,
        redoCount: 0
    };
    const obj = createObject(countObj);
    let func = undoRedoStack.addUndoObject(obj);
    func();
    undo(undoRedoStack);
    redo(undoRedoStack);
    t.equal(countObj.undoCount, 0);
    t.equal(countObj.redoCount, 0);
    t.end();
});

