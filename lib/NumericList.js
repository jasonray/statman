var _ = require('underscore');
var Decimal = require('decimal');

function NumbericList() {
    this._values = [];
}

NumbericList.prototype.push = function (value) {
    var number = value;
    this._values.push(number);
};

NumbericList.prototype.size = function () {
    return this._values.length;
};

NumbericList.prototype.sum = function (value) {
    var self = this;

    var sum = _.reduce(self._values, function (cumlative, value) {
        return cumlative + value;
    }, 0);

    return sum;
};

NumbericList.prototype.average = function (value) {
    var self = this;

    var sum = self.sum();

    var count = self._values.length;
    var average;
    if (count == 0) {
        average = 0;
    } else {
        average = sum / count;
    }

    return average;
};

module.exports = NumbericList;