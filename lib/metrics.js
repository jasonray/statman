var gauge = require('./gauge');
exports.gauge = gauge;

var _metrics = [];

var register = exports.register = function(metric) {
	_metrics.push(metric);
};

var registry = exports.registry = function(metricname, autoRegisterConstructor) {
	if (metricname) {
		//todo: use underscore looping
		for (var i = 0; i < _metrics.length; i++) {
			var g = _metrics[i];
			if (g.name() === metricname) {
				return g;
			}
		}

		//didn't find the metric, so lets auto-create it
		if (autoRegisterConstructor) {
			var metric = autoRegisterConstructor();
			register(metric);
			return metric;
		}


	} else {
		return _metrics;
	}
};