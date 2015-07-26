(function(d, canvasUtility) {
	var c = canvasUtility.canvas;
	var manageClear = function() {
		if (confirm('This will restore your image to its default state.\nAll your modifications will be deleted.\nDo you want to continue?')) {
			clearAll();
		}
	};

	function clearAll() {
		var all = c.getObjects();
		for (var i = all.length - 1; i >= 0; i--) {
			console.log('c', i, all.length)
			c.remove(all[i]);
		}
	}

	canvasUtility.registerActionHandler('clearAll', manageClear);
	
}(document, window._canvasUtil));