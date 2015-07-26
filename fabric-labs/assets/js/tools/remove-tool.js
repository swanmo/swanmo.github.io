(function(d, canvasUtility) {
	var c = canvasUtility.canvas;
	var manageRemoval = function() {
		if (c.getActiveObject()) {
			c.remove(c.getActiveObject());
		}
	};

	// F'låt mamma, men jag orkar inte bryta ut dette beroende till DOMen.
	var oRemoveBtn = d.querySelector('#action_remove');
	var selectedObject;

	var onSelect = function(options) {
		oRemoveBtn.className = c.getActiveObject() ? '' : 'inactive';
	};
	c.on('object:selected', onSelect);
	c.on('selection:cleared', onSelect);

	canvasUtility.registerActionHandler('removeObject', manageRemoval);
	
}(document, window._canvasUtil));