var Gauge = function(gaugeName) {
	var _value = 0;

	this.name = function() {
		return gaugeName;
	};

	this.value = function() {
		return _value;
	};

	this.increment = function() {
		_value++;
	};

	this.decrement = function() {
		_value--;
	};
};

exports.Gauge = Gauge;