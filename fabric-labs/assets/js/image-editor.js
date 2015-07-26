(function(d, w) {

    var canvasTool = w.createCanvasTools('canvasTrash');
    var c = canvasTool.canvas;

    setupTool('action_box', 'rectangle', canvasTool);
    setupTool('action_clear', 'reset', canvasTool);
    setupTool('action_text', 'text', canvasTool);
    setupTool('action_hline', 'hline', canvasTool);
    setupTool('action_arrow', 'arrow', canvasTool);
    setupTool('action_remove', 'remove', canvasTool);
    setupTool('action_dump', 'dump', canvasTool);


    var oRemoveBtn = d.querySelector('#action_remove');

    var onSelect = function(options) {
        oRemoveBtn.className = c.getActiveObject() ? '' : 'inactive';
    };
    c.on('object:selected', onSelect).on('selection:cleared', onSelect);




    function setupTool(domId, canvasToolId, canvasTool) {
        var ToolResource = w.discoverCanvasTool(canvasToolId);
        if (!ToolResource) {
            console.log('Tool ' + canvasToolId + ' is incorrectly registered');
        } else {
            var toolInstance = new ToolResource(canvasTool.canvas, canvasTool);
            console.log('xx', canvasToolId, toolInstance.run);
            if (!toolInstance.run) {
                console.log('Tool ' + canvasToolId + ' has no run function');

            }
            d.getElementById(domId).onclick = toolInstance.run;
        }
    }


}(document, window));
