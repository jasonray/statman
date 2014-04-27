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

	this.increment = function() {
		_value++;
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