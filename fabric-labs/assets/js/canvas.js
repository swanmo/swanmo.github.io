(function(d) {

	var CANVAS_WIDTH = 582; 
	var CANVAS_HEIGHT = 345; 
	var c = new fabric.Canvas('whatta');
	var canvasElem = d.getElementById('canvasWrapper');
	var canvasTop = canvasElem.offsetTop;

	var functionRepository = {};

	/*fabric.Image.fromURL('demo/chart.png', function(oImg) {
	  canvas.add(oImg);
	});/*/
	c.setDimensions({width:CANVAS_WIDTH, height:CANVAS_HEIGHT});

	c.setBackgroundImage('demo/chart.png', c.renderAll.bind(c), {
	  width: c.width,
	  height: c.height,
	  // Needed to position backgroundImage at 0/0
	  originX: 'left',
	  originY: 'top'
	});

	function scrollPosition(elem) {
	    var left = 0,
	        top = 0;

	    do {
	        left += elem.scrollLeft;
	        top += elem.scrollTop;
	    } while ( elem = elem.offsetParent );

	    return [ left, top ];
	}

	window._canvasUtil = {
		canvas: c,
		getWidth: function() {
			console.log('getWidth', this.canvas.width);
			return CANVAS_WIDTH;
		},
		getOffsetTop: function() {

			console.log('pos', scrollPosition(canvasElem));
			return canvasTop - scrollPosition(canvasElem)[1];
		},
		registerActionHandler: function(name, clickHandlerFn) {
			functionRepository[name] = clickHandlerFn;
		},
		getActionHandler: function(name) {
			return functionRepository[name];
		},
	}


}(document));