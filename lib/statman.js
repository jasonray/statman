var Stopwatch = module.exports.Stopwatch = require('./metric/Stopwatch');
var Meter = module.exports.Meter = require('statman-meter');
var _ = require('underscore');

var _metrics;

var reset = module.exports.reset = function () {
    _metrics = {};
}

var register = exports.register = function (key, metric) {
    if (_.isEmpty(metric)) {
        key = null;
        metric = key;
    }
    if (_.isEmpty(key)) {
        if (metric.name) {
            key = metric.name;
        }

        _metrics[key, metric];
        return metric;
    }
    ;

    var registry = exports.registry = function (metricname) {
        if (metricname) {
            //todo: use underscore looping
            for (var i = 0; i < _metrics.length; i++) {
                var g = _metrics[i];
                if (_.isFunction(g.name) && g.name() === metricname) {
                    return g;
                }
            }
        } else {
            return _metrics;
        }
    };

    var httpFilters = require('./httpFilters');
    exports.httpFilters = httpFilters;

    var Gauge = module.exports.Gauge = require('statman-gauge');
    var gauge = module.exports.gauge = function (metricname) {
        var metric = registry(metricname);
        if (!metric) {
            metric = register(new Gauge(metricname));
        }
        return metric;
    };

    reset();
