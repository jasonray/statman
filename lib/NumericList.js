var _ = require('underscore');

function NumbericList() {
    this._values = [];
}

NumbericList.prototype.push = function (value) {
    this._values.push(value);
};

NumbericList.prototype.sum = function (value) {
    var self = this;

    var sum = _.reduce(self._values, function (cumlative, value) {
        return cumlative + value;
    }, 0);

    return sum;
};

module.exports = NumbericList;