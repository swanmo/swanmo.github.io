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
    
    var HorizontalBar = {
        init: function(canvasTool, rootNode) {
            function notify(topic) {
                return function() {
                    canvasTool.notify(topic, 'click');
                };
            }
            var div = d.createElement("div");
            div.id='toolbar';

            rootNode.insertBefore(div, rootNode.childNodes[0]);
            //rootNode.appendChild(div);

            var ul = d.createElement("ul");
            div.appendChild(ul);
            for (var i in tools) {
                var t = d.createElement('li');
                t.id = tools[i].id;
                t.innerHTML = tools[i].content;
                t.onclick = notify(tools[i].address);

                ul.appendChild(t);
            }

        }
    };
	w.registerCanvasService('HorizontalBar', HorizontalBar);
}(window, document));
