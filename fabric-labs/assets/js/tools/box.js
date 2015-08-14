(function(w) {
    'use strict';

    var BoxTool = function(canvas, util) {
        this.init = function() {
            util.subscribeTo(w._canvasToolConst.TOOL.BOX, 'BoxTool', attachBoxListener);
        };
		var rect;
        function abort() {
            console.log('ABORT');
            if (rect) {
                canvas.remove(rect);
                rect = undefined;
            }
        }

        function attachBoxListener(topic, sende, payload) {
            if (payload === 'toolbar-deactivate'){
                abort();
                return;
            }
            rect = new fabric.Rect({
                left: 40,
                top: 40,
                width: 100,
                borderColor: '#444',
                height: 100,
                fill: '#888',
                opacity: 0.2,
                hasControls: true,
                hasRotatingPoint:false,
                originX:'center',
                originY:'center'
            });

            canvas.add(rect);

            var onMove = function(options) {
                if (rect) {
                    rect.set({
                        'top': (options.e.clientY - util.getOffsetTop())
                    });
                    rect.set({
                        'left': options.e.clientX - util.getOffsetLeft()
                    });
                    rect.setCoords();
                    canvas.renderAll();
                }
            };
            canvas.on('mouse:move', onMove);

            function detachHLineListener() {
                if (rect) {
                    canvas.off('mouse:move', onMove);
                    canvas.off('mouse:up', onMUP);
                    rect = undefined;
                }
            }

            var onMUP = function(options) {
                detachHLineListener();
            };

            canvas.on('mouse:up', onMUP);
        }
        return this;
    };

    w.registerCanvasTool('rectangle', BoxTool);

}(window));
