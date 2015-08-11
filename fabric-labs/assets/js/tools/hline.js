(function(w) {

    var HorizontalLineTool = function(canvas, canvasTool) {
        this.init = function() {
            console.log('init HorizontalLineTool');
            canvasTool.subscribeTo(w._canvasToolConst.TOOL.HLINE, 'HorizontalLineTool', this.run);
        };
        var isOngoing = false;
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
        this.run = function() {
            console.log('run hline');
            if (isOngoing) {
                abort();
                return;
            }
            isOngoing = true;
            movingRect = createLineRect();
            canvasTool.subscribe('HLineTool', function(eventType, keyCode) {
                if (eventType === 'keydown' && keyCode === 27) {
                    abort();
                }
            });

            function abort() {
                console.log('aborting hline');
                isOngoing = false;
                canvas.remove(movingRect);
                movingRect = undefined;
                canvasTool.unsubscribe('HLineTool');
                detachHLineListener();
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
