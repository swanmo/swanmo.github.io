(function(w, d) {
    var DumpTool = function(canvas, util) {
		this.init = function() {
            util.subscribeTo(w._canvasToolConst.TOOL.DUMP, 'DumpTool', dumpJson);
        };

        function dumpJson() {
            var oContainer = d.querySelector('#dumpArea');

            oContainer.innerHTML = JSON.stringify(canvas, null, 2);
            oContainer.className = oContainer.className.indexOf('active') >= 0 ? '' : 'active';
        };
        return this;
    };
	w.registerCanvasTool('dump', DumpTool);
}(window, document));
