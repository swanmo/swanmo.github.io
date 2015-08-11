(function(d, w) {
	'use strict';

	var CANVAS_WIDTH = 582; 
	var CANVAS_HEIGHT = 345;
	var functionRepository = {}, serviceRepository = {};
	w._canvasToolConst = {
		TOOL: {
			ARROW:'arr_t',
			BOX:'box_t',
			CLEAR:'cl_t',
			DUMP:'dump_t',
			HLINE:'hline_t',
			REMOVE:'rem_t',
			TEXT:'txt_t'
		}
	};

	w.registerCanvasService = function(name, obj) {
		serviceRepository[name] = obj;
	};

	w.discoverCanvasService = function(name) {
		return serviceRepository[name];
	};

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
		var subscriptionsByTopic = {};

		this.subscribe = function(subscriber, onNotifyFn) {
			subscriptions[subscriber] = onNotifyFn;
		};
		this.subscribeTo = function(topic, subscriberId, onNotifyFn) {

			if (!subscriptionsByTopic[topic]) {
				subscriptionsByTopic[topic] = [];
			}
			subscriptionsByTopic[topic].push({subscriber: subscriberId, callbackFn: onNotifyFn});
		};

		this.unsubscribe = function(subscriber) {
			delete subscriptions[subscriber];
		};

		this.notify = function(topic, payload) {
			for (var s1 in subscriptions) {
				subscriptions[s1].apply(undefined, [topic, payload]);
			}
			for (var s2 in subscriptionsByTopic[topic]) {
				subscriptionsByTopic[topic][s2].callbackFn.apply(undefined, [topic, payload]);
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