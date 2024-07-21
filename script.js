$(document).ready(function() {
    const textInput = $('#text-input');
    const undoBtn = $('#undo-btn');
    const redoBtn = $('#redo-btn');
    const canvasElement = $('#canvas');
    
    const canvas = new fabric.Canvas('canvas', {
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: '#2d2d2d'
    });
    
    let undoStack = [];
    let redoStack = [];
    
    function addTextToCanvas(text) {
        canvas.clear();
        const textObject = new fabric.Text(text, {
            left: 50,
            top: window.innerHeight / 2,  // Center the text vertically
            fill: '#ffffff',
            fontSize: 24,
            originX: 'left',
            originY: 'center'
        });
        canvas.add(textObject);
    }

    textInput.on('input', function() {
        undoStack.push(textInput.val());
        redoStack = [];
        addTextToCanvas(textInput.val());
    });

    undoBtn.click(function() {
        if (undoStack.length > 1) {
            redoStack.push(undoStack.pop());
            const previousState = undoStack[undoStack.length - 1];
            textInput.val(previousState);
            addTextToCanvas(previousState);
        }
    });

    redoBtn.click(function() {
        if (redoStack.length > 0) {
            const nextState = redoStack.pop();
            undoStack.push(nextState);
            textInput.val(nextState);
            addTextToCanvas(nextState);
        }
    });

    $(window).resize(function() {
        canvas.setWidth(window.innerWidth);
        canvas.setHeight(window.innerHeight);
        canvas.renderAll();
    });

    // Initial setup
    addTextToCanvas('');
});
