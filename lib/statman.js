var Gauge = module.exports.Gauge = require('statman-gauge');
var Stopwatch = module.exports.Stopwatch = require('./metric/Stopwatch');
var Meter = module.exports.Meter = require('statman-meter');

var _metrics = [];

var register = exports.register = function(metric) {
	_metrics.push(metric);
	return metric;
};

var registry = exports.registry = function(metricname) {
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

var gauges = exports.gauges = function(metricname) {
	var metric = registry(metricname);
	if (!metric) {
		metric = register(new Gauge(metricname));
	}
	return metric;
};

var httpFilters = require('./httpFilters');
exports.httpFilters = httpFilters;