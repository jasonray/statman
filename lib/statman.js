const Stopwatch = module.exports.Stopwatch = require('statman-stopwatch');
const Meter = module.exports.Meter = require('statman-meter');
const Gauge = module.exports.Gauge = require('statman-gauge');

const _registry = require('./registry');

// var httpFilters = require('./httpFilters');
// exports.httpFilters = httpFilters;

// if gauge with metricname exists,
function gauge(metricname) {
    return _registry.findOrCreate(metricname, Gauge);
}

function meter(metricname) {
    return _registry.findOrCreate(metricname, Meter);
}

function stopwatch(metricname, extraParam) {
    if (extraParam) throw Error('Cannot autostart timer off the implicit constructor')
    return _registry.findOrCreate(metricname, Stopwatch);
}

module.exports.register = _registry.register;
module.exports.reset = _registry.reset;
module.exports.registry = _registry.get;
module.exports.findOrCreate = _registry.findOrCreate;

module.exports.Stopwatch = Stopwatch;
module.exports.stopwatch = stopwatch;

module.exports.Gauge = Gauge;
module.exports.gauge = gauge;

module.exports.Meter = Meter;
module.exports.meter = meter;