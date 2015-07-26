(function(d, canvas, util) {

d.querySelector('#action_box').onclick = attachBoxListener;

function attachBoxListener() {
	var rect = new fabric.Rect({ left: 40, top: 40, width: 100, borderColor: '#444', height: 100, fill: '#888', opacity: 0.2 });
	rect.hasRotatingPoint = false;
	rect.hasControls = true;
	rect.originX = 'center';
	rect.originY = 'center';
	
	canvas.add(rect);


	var onMove = function(options) {
		if (rect) {
			rect.set({'top': (options.e.clientY - util.getOffsetTop())});
			rect.set({'left': options.e.clientX});
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