(function(d, canvas, util) {

    var o = d.querySelector('#action_hline').onclick = attachHLineListener;

    function attachHLineListener() {
        var rect = new fabric.Rect({
            left: 0,
            top: 1,
            width: util.getWidth(),
            height: 2,
            fill: '#f55',
            opacity: 0.7,
            hasControls:false,
            hasBorders: true
        });

        var onRectMove = function(ctx) {
            if (rect) {
                rect.set({
                    'left': 0
                });
            }
        };
        rect.on('moving', onRectMove);

        canvas.add(rect);

        var onMove = function(options) {
            if (rect) {
                rect.set({
                    'top': (options.e.clientY - util.getOffsetTop())
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
            }
        }

        var onMUP = function(options) {
            detachHLineListener();
        };

        canvas.on('mouse:up', onMUP);
    }

}(document, window._canvasUtil.canvas, window._canvasUtil));
