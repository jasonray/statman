var _ = require('underscore');
var Decimal = require('decimal');

function NumbericList() {
    this._values = [];
}

NumbericList.prototype.push = function (value) {
    var number = Decimal(value);
    this._values.push(number);
};

NumbericList.prototype.sum = function (value) {
    var self = this;

    var sum = _.reduce(self._values, function (cumlative, value) {
        return cumlative.add(value);
    }, Decimal(0));

    return sum.toNumber();
};

NumbericList.prototype.average = function (value) {
    var self = this;

    var sum = _.reduce(self._values, function (cumlative, value) {
        return cumlative.add(value);
    }, Decimal(0));

    var count = self._values.length;
    var average;
    if (count == 0) {
        average = 0;
    } else {
        average = sum.div(count);
    }

    return average;
};

module.exports = NumbericList;