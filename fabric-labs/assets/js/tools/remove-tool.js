(function(w) {
    var RemoveTool = function(canvas, util) {
        this.run = function() {
            if (canvas.getActiveObject()) {
                canvas.remove(canvas.getActiveObject());
            }
        };
        return this;
    };
    w.registerCanvasTool('remove', RemoveTool);
}(window));
