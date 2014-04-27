var gaugelib = require('../lib/gauge');

exports.hello = function(test) {
	test.equals(1, 1);
	test.done();
};

exports.gauagename = function(test) {
	var gauge = new gaugelib.Gauge('metric-name');
	test.equal('metric-name', gauge.name());
	test.done();
};

exports.initializesTo0 = function(test) {
	var gauge = new gaugelib.Gauge('metric-name');
	test.equal(0, gauge.value());
	test.done();
};

exports.increment = function(test) {
	var gauge = new gaugelib.Gauge('metric-name');
	gauge.increment();
	test.equal(1, gauge.value());
	test.done();
};

exports.decrement = function(test) {
	var gauge = new gaugelib.Gauge('metric-name');
	gauge.decrement();
	test.equal(-1, gauge.value());
	test.done();
};

exports.set = function(test) {
	var gauge = new gaugelib.Gauge('metric-name');
	gauge.set(5);
	test.equal(5, gauge.value());
	test.done();
};

function testSetWithInvalidInput(test, input) {
	var gauge = new gaugelib.Gauge('metric-name');
	test.throws(function() {
		gauge.set('str');
	}, Error, "`set` should throw exception if passed non-numeric value");
	test.done();
}

exports.setNotAllowString = function(test) {
	var input = "str";
	testSetWithInvalidInput(test, input);
};

exports.setNotAllowNull = function(test) {
	var input = null;
	testSetWithInvalidInput(test, input);
};

exports.setNotAllowUninitialized = function(test) {
	var input;
	testSetWithInvalidInput(test, input);
};

exports.allowCustomValueFunction = function(test) {
	var customValueFunction = function() {
		return 5;
	};

	var gauge = new gaugelib.Gauge('metric-name', customValueFunction);
	test.equal(5, gauge.value());
	test.done();
};

exports.disallowNonFunctionForCustomValueFunction = function(test) {
	test.throws(function() {
		var gauge = new gaugelib.Gauge('metric-name', 5);
	});

	test.done();
};