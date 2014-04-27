var Gauge = function(gaugeName, customValueFunction) {
	var _value = 0;

	this.name = function() {
		return gaugeName;
	};

	console.log('testing customValueFunction is present?');
	if (customValueFunction) {
		if (typeof(customValueFunction) === 'function') {
			this.value = customValueFunction;
		} else {
			throw new Exception('If you are going to supply a custom value function, it must be a function.');
		}
	} else {
		this.value = function() {
			return _value;
		};

	}

	this.increment = function(incrementalValue) {
		if (typeof incrementalValue === "undefined") {
			incrementalValue = 1;
		}
		_value = _value + incrementalValue;
	};

	this.decrement = function() {
		_value--;
	};

	this.set = function(value) {
		if (isNaN(value)) throw new Exception('A gauge value can only be set to a numeric value');
		_value = value;
	};
};

exports.Gauge = Gauge;