var Stopwatch = module.exports.Stopwatch = require('./metric/Stopwatch');
var Meter = module.exports.Meter = require('statman-meter');
var _ = require('underscore');

var _metrics;

var reset = module.exports.reset = function () {
    _metrics = new Map();
}

var register = exports.register = function (key, metric) {
    if (_.isEmpty(metric)) {
        metric = key;
        key = null;
    }

    key = determineKey(key, metric);
    if (_.isEmpty(key)) {
        throw Error('Cannot register a metric without a key.  Key can be specified as a parameter, or supplied in the metric as name, name(), or getName()');
    }

    _metrics.set(key, metric);
    return metric;


    function determineKey(key, metric) {
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
        return key;
    }
};

function findOrCreate(metricname, constructor) {
    var metric = registry(metricname);
    if (!metric) {
        metric = register(new Gauge(metricname));
    }
    return metric;
} ;

var registry = exports.registry = function (metricname) {
    if (metricname) {
        return _metrics.get(metricname);
    } else {
        return Array.from(_metrics.values());
    }
};

// var httpFilters = require('./httpFilters');
// exports.httpFilters = httpFilters;

var Gauge = module.exports.Gauge = require('statman-gauge');
var gauge = module.exports.gauge = function (metricname) {
    var metric = registry(metricname);
    if (!metric) {
        metric = register(new Gauge(metricname));
    }
    return metric;
};

var Meter = module.exports.Meter = require('statman-meter');
var meter = module.exports.meter = function (metricname) {
    var metric = registry(metricname);
    if (!metric) {
        metric = register(new Meter(metricname));
    }
    return metric;
};

reset();
