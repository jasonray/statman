var _ = require('underscore');
var Decimal = require('decimal');

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
    var sum = _.reduce(self._events, function (memo, num) {
        var returnvalue = memo.add(num);
        return returnvalue;
    }, Decimal(0));
    var number = self._events.length;
    var ave = sum.div(number);
    return ave;
};

module.exports = Meter;