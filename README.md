# Undo-Redo

## What is Undo-Redo?
Undo-Redo is a simple library that allows you to customize the behavior of the standard undo and redo key operations (`Cmd+Z` and `Cmd+Shift+Z`).

## How does it work?
Setup an environment for your undo-redo stack with the make() function 

**js**
```javascript
undoRedoStack.make(document.body, true);
```

Create an element that has undo and redo attributes that specify what happens when `Cmd+Z` and `Cmd+Shift+Z` are pressed.

**js**
```javascript
//an example object
var obj = {
    undo: function() {
        document.body.removeChild(elem);
        return true;
    },
    redo: function() {
        document.body.appendChild(elem);
        return true;
    }
};
```

Add this element to your undo-redo stack with the addUndoObject() function

**js**
```javascript
undoRedoStack.addUndoObject(object);
```

## Run Demo Undo-Redo Application
Run `iqb start` in the root directory to run a demo application with Undo-Redo.
