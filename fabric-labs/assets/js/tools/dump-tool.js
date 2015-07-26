(function(d, canvas) {
	var manageDump = function() {

		var oContainer = d.querySelector('#dumpArea');
		
		oContainer.innerHTML = JSON.stringify(canvas, null, 2);
		oContainer.className = oContainer.className.indexOf ('active') >= 0 ? '' : 'active';
	};
	d.querySelector('#action_dump').onclick = manageDump;
	
}(document, window._canvasUtil.canvas));