(function(w) {
    'use strict';

    var BoxTool = function(canvas, util) {
        var rect;

        this.init = function() {
            util.subscribeTo(w._canvasToolConst.TOOL.BOX, 'BoxTool', attachBoxListener);
        };


        function done() {
            if (rect) {
                notify('inactive');
                detachBoxListener();
                canvas.selection = true; // Restore fabricjs selection-box
                canvas.forEachObject(function(o) {
                  o.selectable = true;
                });
            }
        }

        function notify(message) {
            util.notify('TOOL_USAGE', w._canvasToolConst.TOOL.BOX, message);
        }

        function detachBoxListener() {
            if (rect) {
                canvas.off('mouse:down', mouseDown);
                canvas.off('mouse:move', drawBox);
                canvas.off('mouse:up', drawBoxDone);
                
                rect = undefined;
                util.unsubscribeTo('keydown', 'BoxTool');
            }
        }
        var currWidth, currHeight;

        function drawBox(options) {
            if (rect) {                
                currWidth = (options.e.clientX - util.getOffsetLeft()) - startLeft;
                currHeight = (options.e.clientY - util.getOffsetTop()) - startTop;

                rect.set({
                    'width': currWidth
                });
                rect.set({
                    'height': currHeight
                });
                rect.setCoords();
                canvas.renderAll();
            }
        }
        function drawBoxDone(options) {
            canvas.off('mouse:move', drawBox);
            canvas.off('mouse:up', drawBoxDone);

            if (Math.abs(currWidth) < 5 && Math.abs(currHeight) < 5) {
                canvas.remove(rect);
                return;
            }
            rect.set({opacity: 0.2})
            canvas.renderAll();
        }

        var currWidth, currHeight, startTop, startLeft;

        function mouseDown(options) {
            
            currWidth = currHeight = 0;
            startTop = (options.e.clientY - util.getOffsetTop());
            startLeft = (options.e.clientX - util.getOffsetLeft());

            rect = new fabric.Rect({
                left: startLeft,
                top: startTop,
                width: 4,
                borderColor: '#444',
                height: 4,
                fill: '#888',
                opacity: 0.3,
                hasControls: true,
                hasRotatingPoint:false,
                originX:'left',
                originY:'top',
                selectable: false
            });

            canvas.add(rect);
            rect.setCoords();
            canvas.renderAll();
            canvas.on('mouse:move', drawBox);
            canvas.on('mouse:up', drawBoxDone);
        }

        function mouseClick(options) {
            notify('inactive');
            detachBoxListener();
        }

        function attachBoxListener(topic, sender, payload) {
            if (payload === 'toolbar-deactivate'){
                done();
                return;
            }
            util.subscribeTo('keydown', 'BoxTool', function(topic, sender, keyCode) {
                if (keyCode === 27) {
                    done();
                }
            });
            canvas.selection = false; // Disable fabricjs selection-box
            canvas.forEachObject(function(o) {
              o.selectable = false;
            });
            notify('active');
            
            canvas.on('mouse:down', mouseDown);
        }
        return this;
    };

    w.registerCanvasTool('rectangle', BoxTool);

}(window));
