var _ = require('underscore');
var NumericList = require('../NumericList');
var Stopwatch = require('./Stopwatch');

function Meter() {
    this._events = new NumericList();
}

Meter.prototype.record = function (item) {
    console.log('record: %d', item);
    var eventTime;
    if (_.isNumber(item)) {
        eventTime = item;
    } else if (item instanceof Stopwatch) {
        console.log('stopwatch %d', item.read());
        eventTime = item.read();
    } else {
        console.log('what are we recording %d', item);
        eventTime = 0;
    }

    this._events.push(eventTime);
};

Meter.prototype.getCount = function () {
    return this._events.size();
};

Meter.prototype.getAverage = function () {
    return this._events.average();
};

module.exports = Meter;