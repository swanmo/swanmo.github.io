(function(d, w) {
    'use strict';

    w.canvasToolX = function(domId, options) {
        var canvasTool = w.createCanvasTools(domId);
        var c = canvasTool.canvas;
        var toolbar = w.discoverCanvasService('HorizontalBar');
        if (!toolbar) {
            alert('Toolbar unavailable');
            return;
        }
        toolbar.init(canvasTool,d.getElementById('canvasTrash'));

        
        var hasToolsDef = !!options && !!options.tools;

        if (!hasToolsDef || options.tools.indexOf('rectangle') >= 0)
            setupTool('action_box', 'rectangle', canvasTool);
        if (!hasToolsDef || options.tools.indexOf('reset') >= 0)
            setupTool('action_clear', 'reset', canvasTool);
        if (!hasToolsDef || options.tools.indexOf('text') >= 0)
            setupTool('action_text', 'text', canvasTool);
        if (!hasToolsDef || options.tools.indexOf('hline') >= 0)
            setupTool('action_hline', 'hline', canvasTool,d.getElementById('action_hline') );
        if (!hasToolsDef || options.tools.indexOf('arrow') >= 0)
            setupTool('action_arrow', 'arrow', canvasTool);
        if (!hasToolsDef || options.tools.indexOf('remove') >= 0)
            setupTool('action_remove', 'remove', canvasTool);
        if (!hasToolsDef || options.tools.indexOf('dump') >= 0)
            setupTool('action_dump', 'dump', canvasTool);

        d.onkeydown = function(e) {
            if (e.keyCode === 46 || e.keyCode === 27) {
                canvasTool.notify('keydown', 'toolbar', e.keyCode);
            }
        };

        var oRemoveBtn = d.querySelector('#action_remove');

        var onSelect = function(options) {
            oRemoveBtn.className = c.getActiveObject() ? '' : 'inactive';
        };
        c.on('object:selected', onSelect).on('selection:cleared', onSelect);

    };


    function setupTool(domId, canvasToolId, canvasTool) {

        var ToolResource = w.discoverCanvasTool(canvasToolId);

        if (!ToolResource) {
            console.log('Tool ' + canvasToolId + ' is incorrectly registered');
        } else {
            var toolInstance = new ToolResource(canvasTool.canvas, canvasTool);

            if (!toolInstance.init) {
                console.log('Tool ' + canvasToolId + ' has no init function');
            } else {
                toolInstance.init();
            }
            return toolInstance;
        }
    }


}(document, window));
