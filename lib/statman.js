var _ = require('underscore');
var Stopwatch = require('./metric/Stopwatch');
var Gauge = require('statman-gauge');
var Meter = require('statman-meter');

//global collection of metrics.  Having this global makes it easy for other parts of application to access
var _metrics;

function reset() {
    _metrics = new Map();
}

function register(key, metric) {
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
}

function findOrCreate(metricname, constructor) {
    var metric = registry(metricname);
    if (!metric) {
        metric = register(new constructor(metricname));
    }
    return metric;
}

// if metricname is provided, will return single metric
// if metricname is NOT provided, will return array of all metrics
function registry(metricname) {
    if (metricname) {
        return _metrics.get(metricname);
    } else {
        return Array.from(_metrics.values());
    }
}

// var httpFilters = require('./httpFilters');
// exports.httpFilters = httpFilters;

// if gauge with metricname exists,
function gauge(metricname) {
    return findOrCreate(metricname, Gauge);
}


function meter(metricname) {
    return findOrCreate(metricname, Meter);
}

reset();


module.exports.register = register;
module.exports.reset = reset;
module.exports.Stopwatch = Stopwatch;
module.exports.registry = registry;
module.exports.Gauge = Gauge;
module.exports.gauge = gauge;
module.exports.Meter = Meter;
module.exports.meter = meter;