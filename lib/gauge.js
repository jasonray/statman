var Gauge = function(gaugeName, customValueFunction) {
	var _value = 0;

	this.name = function() {
		return gaugeName;
	};

	if (customValueFunction) {
		this.value = customValueFunction;
	} else {
		this.value = function() {
			return _value;
		};

	}

	this.increment = function() {
		_value++;
	};

	this.decrement = function() {
		_value--;
	};

	this.set = function(value) {
		if (isNaN(value)) throw new Exception();
		_value = value;
	};
};

exports.Gauge = Gauge;