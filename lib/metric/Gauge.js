function Gauge(gaugeName, customValueFunction) {
    var _value = 0;

    this.name = function () {
        return gaugeName;
    };

    if (customValueFunction) {
        if (typeof(customValueFunction) === 'function') {
            this.value = customValueFunction;
        } else {
            throw new Exception('If you are going to supply a custom value function, it must be a function.');
        }
    } else {
        this.value = function () {
            return _value;
        };
    }

    function shiftValue(delta) {
        _value = _value + delta;
    }

    this.increment = function (delta) {
        if (typeof delta === "undefined") {
            shiftValue(1);
        } else {
            shiftValue(delta);
        }
    };

    this.decrement = function (delta) {
        if (typeof delta === "undefined") {
            shiftValue(-1);
        } else {
            shiftValue(-1 * delta);
        }
    };

    this.set = function (value) {
        if (isNaN(value)) throw new Exception('A gauge value can only be set to a numeric value');
        _value = value;
    };
};

module.exports = Gauge;