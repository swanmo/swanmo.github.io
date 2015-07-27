(function(d, w) {

	var CANVAS_WIDTH = 582; 
	var CANVAS_HEIGHT = 345;
	var functionRepository = {};

	w.registerCanvasTool = function(name, initFn) {
		functionRepository[name] = initFn;
	};
	w.discoverCanvasTool = function(name) {
		return functionRepository[name];
	};

	function scrollPosition(elem) {
	    var left = 0,
	        top = 0;

	    do {
	        left += elem.scrollLeft;
	        top += elem.scrollTop;
	    } while ( elem = elem.offsetParent );

	    return [ left, top ];
	}

	w.createCanvasTools = function(domId) {
		var canvasElem = document.createElement("canvas");
		var canvasWrapper = d.getElementById(domId);
		canvasWrapper.appendChild(canvasElem);
		return new CanvasTools(canvasElem, canvasWrapper);
	};

	function CanvasTools(canvasElem, canvasWrapper) {
		this.canvasElem = canvasElem;
		
		this.canvasWrapper = canvasWrapper;
		this.canvasTop = canvasElem.offsetTop;
		this.canvasLeft = canvasElem.offsetLeft;

		var subscriptions = {};
		this.subscribe = function(subscriber, onNotifyFn) {
			subscriptions[subscriber] = onNotifyFn;
		};

		this.unsubscribe = function(subscriber) {
			delete subscriptions[subscriber];
		};

		this.notify = function(eventType, payload) {
			for (var key in subscriptions) {
				subscriptions[key].apply(undefined, [eventType, payload]);
			}
		};

		this.initFabricjsCanvas = function(canvasElem) {
			var fabricCanvas = new fabric.Canvas(canvasElem);

			/* fabric.Image.fromURL('demo/chart.png', function(oImg) {
			  canvas.add(oImg);
			});/*/
			fabricCanvas.setDimensions({width:CANVAS_WIDTH, height:CANVAS_HEIGHT});

			fabricCanvas.setBackgroundImage('demo/chart.png', fabricCanvas.renderAll.bind(fabricCanvas), {
			  width: fabricCanvas.width,
			  height: fabricCanvas.height,
			  // Needed to position backgroundImage at 0/0
			  originX: 'left',
			  originY: 'top'
			});
			return fabricCanvas;
		};
		this.canvas = this.initFabricjsCanvas(canvasElem);
		

		this.getWidth = function() {
			console.log('getWidth', this.canvasElem.width);
			return CANVAS_WIDTH;
		};
		this.getOffsetLeft = function() {
			return this.canvasLeft  - scrollPosition(this.canvasElem)[0]
		};
		this.getOffsetTop = function() {
			return this.canvasTop - scrollPosition(this.canvasElem)[1];
		};
	}
}(document, window));