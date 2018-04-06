const isEmpty = require('lodash.isempty');
const isFunction = require('lodash.isfunction');

//global collection of metrics.  Having this global makes it easy for other parts of application to access
var _metrics;
reset();

function reset() {
    _metrics = new Map();
}

function register(key, metric) {
    if (isEmpty(metric)) {
        metric = key;
        key = null;
    }

    key = determineKey(key, metric);
    if (isEmpty(key)) {
        throw Error('Cannot register a metric without a key.  Key can be specified as a parameter, or supplied in the metric as name, name(), or getName()');
    }

    _metrics.set(key, metric);
    return metric;


    function determineKey(key, metric) {
        if (isEmpty(key)) {
            if (isFunction(metric.name)) {
                key = metric.name();
            }
            else if (isFunction(metric.getName)) {
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

    if (isEmpty(existingMetric)) {
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
