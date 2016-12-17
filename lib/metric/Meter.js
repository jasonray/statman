function Meter() {
    this._count = 0;
}

Meter.prototype.record = function () {
    this._count += 1;
};

Meter.prototype.getCount = function () {
    return this._count;
};

module.exports = Meter;