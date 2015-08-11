(function(w) {
	'use strict';
	var ResetTool = function(canvas, util) {
		this.init = function() {
            util.subscribeTo(w._canvasToolConst.TOOL.CLEAR, 'RemoveTool', runClearAll);
        };

		function runClearAll() {
			if (confirm('This will restore your image to its default state.\nAll your modifications will be deleted.\nDo you want to continue?')) {
				clearAll();
			}
		}	

		function clearAll() {
			let all = canvas.getObjects();
			for (let i = all.length - 1; i >= 0; i--) {
				canvas.remove(all[i]);
			}
		}
	};

	w.registerCanvasTool('reset', ResetTool);
	
}(window));