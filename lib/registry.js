var _ = require('underscore');

//global collection of metrics.  Having this global makes it easy for other parts of application to access
var _metrics;
reset();

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
    var existingMetric;
    if (metricname) {
        existingMetric = get(metricname);
    }

    if (_.isEmpty(existingMetric)) {
        var newMetric = new constructor(metricname);
        return register(newMetric);
    } else {
        return existingMetric;
    }
    return existingMetric;
}

// if metricname is provided, will return single metric
// if metricname is NOT provided, will return array of all metrics
function get(metricname) {
    if (metricname) {
        return _metrics.get(metricname);
    } else {
        return Array.from(_metrics.values());
    }
}

module.exports.get = get;
module.exports.register = register;
module.exports.reset = reset;
module.exports.findOrCreate = findOrCreate;
