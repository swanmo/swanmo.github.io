(function(w) {
    'use strict';

    var editorHeight = 30;

    var TextTool = function(canvas, util) {
        this.init = function() {
            util.subscribeTo(w._canvasToolConst.TOOL.TEXT, 'TextTool', this.run);
        };
        this.run = function() {
            var editor = new fabric.IText('Click to leave a comment', {
                fontFamily: 'arial black',
                fontSize: 18,
                left: 100,
                top: -40,
                hasControls: false
            });

            canvas.add(editor);

            var onMove = function(options) {
                if (editor) {
                    editor.set({
                        'top': (options.e.clientY - util.getOffsetTop())
                    });
                    editor.set({
                        'left': options.e.clientX - util.getOffsetLeft()
                    });
                    editor.setCoords();
                    canvas.renderAll();
                }
            };
            canvas.on('mouse:move', onMove);

            function detachTextListener() {
                if (editor) {
                    canvas.off('mouse:move', onMove);
                    canvas.off('mouse:up', detachTextListener);
                    editor.setCoords();
                    editor = undefined;
                    canvas.renderAll();
                }
            }
            canvas.on('mouse:up', detachTextListener);
        };
        return this;
    };
    w.registerCanvasTool('text', TextTool);
}(window));
