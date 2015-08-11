(function(w) {
    var RemoveTool = function(canvas, canvasTool) {
    	this.init = function() {
            canvasTool.subscribeTo(w._canvasToolConst.TOOL.REMOVE, 'RemoveTool', remove);
        };

        var remove = function() {
            if (canvas.getActiveObject()) {
                canvas.remove(canvas.getActiveObject());
            }
        };

        canvasTool.subscribe('RemoveTool', function(eventType, keyCode) {
        	if (eventType === 'keydown' && keyCode === 46) {
        		remove();
        	}
        });
        return this;
    };
    w.registerCanvasTool('remove', RemoveTool);
}(window));
