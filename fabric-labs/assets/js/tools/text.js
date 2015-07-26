(function(d, canvas, util) {

var o = d.querySelector('#action_text').onclick = attachTextListener;
var editorHeight = 30;

function attachTextListener() {
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
			editor.set({'top': (options.e.clientY - util.getOffsetTop())});
			editor.set({'left': options.e.clientX - util.getOffsetLeft()});
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
}

}(document, window._canvasUtil.canvas, window._canvasUtil));