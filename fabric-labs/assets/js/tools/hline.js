(function(w) {
    'use strict';

    var HorizontalLineTool = function(canvas, canvasTool) {
        this.init = function() {
            canvasTool.subscribeTo(w._canvasToolConst.TOOL.HLINE, 'HorizontalLineTool', this.run);
        };
        var isOngoing = false;
        function notify(message) {
            canvasTool.notify('TOOL_USAGE', w._canvasToolConst.TOOL.HLINE, message);
        }
        function createLineRect() {
            return new fabric.Rect({
                left: 0,
                top: 1,
                width: canvasTool.getWidth(),
                height: 2,
                fill: '#000',
                opacity: 0.7,
                hasControls: false,
                hasBorders: true
            });
        }
        var movingRect;
        this.run = function(addr, sender, action) {

            if (isOngoing) {
                abort();
                return;
            }
            notify('active');
            isOngoing = true;
            movingRect = createLineRect();
            canvasTool.subscribeTo('keydown', 'HLineTool', function(topic, sender, keyCode) {
                if (keyCode === 27) {
                    abort();
                }
            });

            function abort() {
                isOngoing = false;
                canvas.remove(movingRect);
                movingRect = undefined;
                canvasTool.unsubscribe('HLineTool');

                detachHLineListener();
                notify('inactive');
            }
            

            var onRectMove = function(ctx) {
                if (movingRect) {
                    movingRect.set({
                        'left': 0
                    });
                }
            };
            movingRect.on('moving', onRectMove);

            canvas.add(movingRect);

            var onMove = function(options) {
                if (movingRect) {
                    movingRect.set({
                        'top': (options.e.clientY - canvasTool.getOffsetTop())
                    });
                    movingRect.setCoords();
                    canvas.renderAll();
                }
            };
            canvas.on('mouse:move', onMove);

            function detachHLineListener() {
            
                canvas.off('mouse:move', onMove);
                canvas.off('mouse:up', onMUP);
                
            }

            var onMUP = function(options) {
                movingRect.fill='#666';
                movingRect = createLineRect();
                canvas.add(movingRect);
            };

            canvas.on('mouse:up', onMUP);
        };
        return this;
    };
    w.registerCanvasTool('hline', HorizontalLineTool);
}(window));
