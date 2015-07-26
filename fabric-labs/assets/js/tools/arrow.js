(function(w) {

    var circleMarkerRadius = 8;
    var indicationLength = 20;
    var arrowColor = '#444';
    var dragArrowColor = '#888';

    var ArrowTool = function(canvas, util) {
        var arrow;

        // Cred till http://stackoverflow.com/questions/29890294/arrow-shape-using-fabricjs
        function moveArrowIndicator(points) {
            var x1 = points[0],
                y1 = points[1],
                x2 = points[2],
                y2 = points[3],

                dx = x2 - x1,
                dy = y2 - y1,

                angle = Math.atan2(dy, dx);

            angle *= 180 / Math.PI;
            angle += 90;
            if (arrow) {
                canvas.remove(arrow);
            }
            arrow = new fabric.Triangle({
                angle: angle,
                fill: dragArrowColor,
                top: y2,
                left: x2,
                height: indicationLength,
                width: indicationLength,
                originX: 'center',
                originY: 'center',
                selectable: false
            });

            canvas.add(arrow);
        }

        this.run = function() {
            var start, end;
            var circleMarker = new fabric.Circle({
                radius: circleMarkerRadius,
                fill: arrowColor,
                opacity: 0.7,
                left: 100,
                top: 0,
                selectable: false,
                originX: 'center',
                originY: 'center'
            });
            canvas.add(circleMarker);


            var line = new fabric.Line([0, 0, 300, 300], {
                strokeWidth: 5,
                stroke: dragArrowColor,
                originX: 'center',
                originY: 'center',
                hasControls: false,
                hasBorders: true,
                selectable: true
            });


            var onMove = function(options) {
                if (circleMarker) {
                    circleMarker.set({
                        'top': (options.e.clientY - util.getOffsetTop())
                    });
                    circleMarker.set({
                        'left': options.e.clientX - util.getOffsetLeft()
                    });
                    circleMarker.setCoords();
                }
                if (start) {
                    var _x2 = options.e.clientX - util.getOffsetLeft();
                    var _y2 = options.e.clientY - util.getOffsetTop();
                    line.set({
                        'x2': _x2
                    });
                    line.set({
                        'y2': _y2
                    });

                    moveArrowIndicator([start.left, start.top, _x2, _y2]);
                }

                canvas.renderAll();
            };
            canvas.on('mouse:move', onMove);

            var onMUP = function(options) {
                if (!start) {
                    start = {
                        top: circleMarker.get('top'),
                        left: circleMarker.get('left')
                    };
                    line.set({
                        'x1': start.left
                    });
                    line.set({
                        'y1': start.top
                    });
                    line.set({
                        'x2': start.left
                    });
                    line.set({
                        'y2': start.top
                    });
                    canvas.add(line);
                    canvas.remove(circleMarker);
                    circleMarker = undefined;
                } else if (!end) {
                    end = {
                        top: options.e.clientY - util.getOffsetTop(),
                        left: options.e.clientX - util.getOffsetLeft()
                    };
                    canvas.off('mouse:move', onMove);
                    canvas.off('mouse:up', onMUP);
                    arrow.fill = arrowColor;
                    var group = new fabric.Group([line, arrow], {
                        hasControls: false,
                        hasBorders: true,
                        selectable: true
                    });
                    line.stroke = arrowColor;

                    canvas.add(group);
                    canvas.remove(line);
                    canvas.remove(arrow);
                    arrow = undefined;
                }
                canvas.renderAll();
            };

            canvas.on('mouse:up', onMUP);
        };
        return this;
    };
	w.registerCanvasTool('arrow', ArrowTool);
}(window));
