var gauge = require('./gauge');
exports.gauge = gauge;

var _metrics = [];

exports.register = function(metric) {
	_metrics.push(metric);
};

exports.registry = function(metricname) {
	if (metricname) {
		//todo: use underscore looping
		for (var i = 0; i < _metrics.length; i++) {
			var g = _metrics[i];
			if (g.name() === metricname) {
				return g;
			}
		}
	} else {
		return _metrics;
	}
};