var _ = require('underscore');
var NumericList = require('../NumericList');

function Meter() {
    this._events = new NumericList();
}

Meter.prototype.record = function (eventTime) {
    this._events.push(eventTime);
};

Meter.prototype.getCount = function () {
    return this._events.size();
};

Meter.prototype.getAverage = function () {
    return this._events.average();
};

module.exports = Meter;