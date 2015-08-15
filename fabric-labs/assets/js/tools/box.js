(function(w) {
    'use strict';

    var BoxTool = function(canvas, util) {
        var rect;

        this.init = function() {
            util.subscribeTo(w._canvasToolConst.TOOL.BOX, 'BoxTool', attachBoxListener);
        };
		
        function abort() {
            if (rect) {
                notify('inactive');
                canvas.remove(rect);
                detachBoxListener();
            }
        }

        function notify(message) {
            util.notify('TOOL_USAGE', w._canvasToolConst.TOOL.BOX, message);
        }

        function detachBoxListener() {
            if (rect) {
                canvas.off('mouse:move', moveBox);
                canvas.off('mouse:up', mouseClick);
                rect = undefined;
            }
        }

        function moveBox(options) {
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

        function mouseClick(options) {
            notify('inactive');
            detachBoxListener();
        };

        function attachBoxListener(topic, sende, payload) {
            console.log('BOX * * * * * *', payload);
            if (payload === 'toolbar-deactivate'){
                abort();
                return;
            }
            notify('active');
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

            
            canvas.on('mouse:move', moveBox);
            canvas.on('mouse:up', mouseClick);
        }
        return this;
    };

    w.registerCanvasTool('rectangle', BoxTool);

}(window));
