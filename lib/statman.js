var Stopwatch = module.exports.Stopwatch = require('./metric/Stopwatch');
var Meter = module.exports.Meter = require('statman-meter');
var _ = require('underscore');

var _metrics;

var reset = module.exports.reset = function () {
    _metrics = {};
}

var register = exports.register = function (key, metric) {
    console.log('register %s => %s', key, metric);
    if (_.isEmpty(metric)) {
        metric = key;
        key = null;
    }

    if (_.isEmpty(key)) {
        if (_.isFunction(metric.name)) {
            key = metric.name();
        }
        else if (_.isFunction(metric.getName)) {
            key = metric.getName();
        }
        else if (metric.name) {
            key = metric.name;
        }
    }
    console.log('cont register %s => %s', key, metric);
    if (_.isEmpty(key)) {
        throw Error('Cannot register a metric without a key.  Key can be specified as a parameter, or supplied in the metric as name, name(), or getName()');
    }

    _metrics[key, metric];
    return metric;
};

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
