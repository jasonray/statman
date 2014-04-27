var guagelib = require("./gauge");

var _gauges = [];

var gauges = function(metricname) {

	if (metricname) {
		for (var i = 0; i < _gauges.length; i++) {
			var g = _gauges[i];
			if (g.name() === metricname) {
				return g;
			}
		}
	} else {
		console.log('about to return gauges registry');
		var guagesObject = {};
		guagesObject.register = function(metricname) {
			var gauge = new guagelib.Gauge(metricname);
			_gauges.push(gauge);
			return gauge;
		};
		return guagesObject;
	}

};


exports.gauges = gauges;