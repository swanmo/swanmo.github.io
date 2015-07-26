(function(d, canvas, util) {

var o = d.querySelector('#action_zone').onclick = attachBoxListener;
var editorHeight = 30;

function attachBoxListener() {
	var editor = new fabric.IText('Click to leave a comment', { 
	  fontFamily: 'arial black',
	  fontSize: 20,
	  left: 100, 
	  top: 100
	});
	editor.hasControls = false;

	var rect = new fabric.Rect({ left: 40, top: 40, width: 100, borderColor: '#444', height: 100, fill: '#888', opacity: 0.2 });
	rect.hasRotatingPoint = false;
	rect.hasControls = true;
	rect.originX = 'center';
	rect.originY = 'center';
	
	canvas.add(rect);
	canvas.add(editor);

	rect.on('modified', positionEditor);

	function positionEditor() {
		var box = rect.getBoundingRect();
		editor.set({'top': (box.top - editorHeight)});
		editor.set({'left': box.left});
		editor.setCoords();
	}

	var onMove = function(options) {
		if (rect) {
			rect.set({'top': (options.e.clientY - util.getOffsetTop())});
			rect.set({'left': options.e.clientX});
			var box = rect.getBoundingRect();

			rect.setCoords();
			positionEditor();
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