function gauge() {
	var _value = 0;

	this.getValue = function() {
		return _value;
	};
	this.setValue = function(newvalue) {
		_value = newvalue;
	};
}

exports.gauge = gauge;