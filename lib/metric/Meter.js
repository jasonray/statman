var _ = require('underscore');

function Meter() {
    this._events = [];
}

Meter.prototype.record = function (eventTime) {
    this._events.push(eventTime);
};

Meter.prototype.getCount = function () {
    return this._events.length;
};

Meter.prototype.getAverage = function () {
    var self = this;
    return _.reduce(self._events, function (memo, num) {
            return memo + num;
        }, 0) / self._events.length;
};

module.exports = Meter;