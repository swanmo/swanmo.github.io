(function(w) {
	'use strict';
	var ResetTool = function(canvas, util) {
		this.init = function() {
            util.subscribeTo(w._canvasToolConst.TOOL.CLEAR, 'RemoveTool', initClear);
        };


		function initClear(topic, sender, payload) {
			if (payload !== 'toolbar-deactivate' &&
				confirm('This will restore your image to its default state.\nAll your modifications will be deleted.\nDo you want to continue?')) {
				clearAllElements();
			}
		}	

		function clearAllElements() {
			var all = canvas.getObjects();
			for (var i = all.length - 1; i >= 0; i--) {
				canvas.remove(all[i]);
			}
		}
	};

	w.registerCanvasTool('reset', ResetTool);
	
}(window));