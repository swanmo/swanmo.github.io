(function(w) {
	var ResetTool = function(canvas, util) {
		this.run = function() {
			if (confirm('This will restore your image to its default state.\nAll your modifications will be deleted.\nDo you want to continue?')) {
				clearAll();
			}
		};

		function clearAll() {
			var all = canvas.getObjects();
			for (var i = all.length - 1; i >= 0; i--) {
				canvas.remove(all[i]);
			}
		}
	};

	w.registerCanvasTool('reset', ResetTool);
	
}(window));