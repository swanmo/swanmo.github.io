(function(w) {
    var RemoveTool = function(canvas, canvasTool) {
        var remove = function() {
            if (canvas.getActiveObject()) {
                canvas.remove(canvas.getActiveObject());
            }
        };
        this.run = remove;
        canvasTool.subscribe('RemoveTool', function(eventType, keyCode) {
        	if (eventType === 'keydown' && keyCode === 46) {
        		remove();
        	}
        });
        return this;
    };
    w.registerCanvasTool('remove', RemoveTool);
}(window));
