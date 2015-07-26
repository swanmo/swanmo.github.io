(function(d, canvasUtility) {

	setupIfPresent('removeObject', '#action_remove');
	setupIfPresent('clearAll', '#action_clear');

	function setupIfPresent(functionId, domSelector) {
		var actionHandler = canvasUtility.getActionHandler(functionId);
		if (actionHandler) {
			d.querySelector(domSelector).onclick = actionHandler;
			console.log('Setup of tool ' + functionId + ' is complete');
		} else {
			console.log('Setup of tool ' + functionId + ' was incomplete');
		}
	}
	
}(document, window._canvasUtil));