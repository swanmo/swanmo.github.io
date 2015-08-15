(function(w, d) {
    'use strict';

    var CONST = w._canvasToolConst;
    var tools = [
        {id: 'action_box', content:'<i class="fa fa-square-o"></i>', address: CONST.TOOL.BOX},
        {id: 'action_arrow', content:'<i class="fa fa-long-arrow-right"></i>', address: CONST.TOOL.ARROW},
        {id: 'action_hline', content:'<i class="fa fa-minus-square-o"></i>', address: CONST.TOOL.HLINE},
        {id: 'action_text', content:'<i class="fa fa-font"></i>', address: CONST.TOOL.TEXT},
        {id: 'action_remove', content:'<i class="fa fa-trash-o"></i>', address: CONST.TOOL.REMOVE},
        {id: 'action_clear', content:'<i class="fa fa-bar-chart"></i>', address: CONST.TOOL.CLEAR},
        {id: 'action_dump', content:'<i class="fa fa-floppy-o"></i>', address: CONST.TOOL.DUMP}
    ];

    function findTool(_address) {
        for (var i in tools) {
            if (tools[i].address === _address) {
                return tools[i];
            }
        }
    }
    
    var HorizontalBar = {
        init: function(canvasTool, rootNode) {
            var activeTool;
            function notifyActive(topic) {
                return function() {
                    if (activeTool) {
                        canvasTool.notify(activeTool, 'toolbar', 'toolbar-deactivate');    
                    }
                    if (activeTool !== topic) {
                        activeTool = topic;
                        canvasTool.notify(topic, 'toolbar', 'toolbar-click');
                    } else {
                        activeTool = undefined;
                    }
                };
            }
            var div = d.createElement('div');
            div.id='toolbar';

            rootNode.insertBefore(div, rootNode.childNodes[0]);

            var ul = d.createElement('ul');
            div.appendChild(ul);
            for (var i in tools) {
                var t = d.createElement('li');
                t.id = tools[i].id;
                t.innerHTML = tools[i].content;
                t.onclick = notifyActive(tools[i].address);

                ul.appendChild(t);
            }
            canvasTool.subscribeTo('TOOL_USAGE', 'toolbar', function(subscriptionId, sender, status) {
                var currTool = findTool(sender);

                if (status !== 'active') {
                    if(sender === activeTool) {
                        activeTool = undefined;
                    }
                    d.getElementById(currTool.id).className = '';
                } else {
                    d.getElementById(currTool.id).className = 'active';
                }
            });
        }
    };
	w.registerCanvasService('HorizontalBar', HorizontalBar);
}(window, document));
