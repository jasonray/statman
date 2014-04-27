var gaugelib = require('../lib/gauge');

exports.hello = function (test) {
	test.equals(1,1);
	test.done();
};

exports.gauagename = function (test) {
	var gauge = new gaugelib.Gauge('metric-name');
	test.equal('metric-name', gauge.name() );
	test.done();
};

exports.initializesTo0 = function (test) {
	var gauge = new gaugelib.Gauge('metric-name');
	test.equal(0, gauge.value() );
	test.done();
};

exports.increment = function (test) {
	var gauge = new gaugelib.Gauge('metric-name');
	gauge.increment();
	test.equal(1, gauge.value() );
	test.done();
};

exports.decrement = function (test) {
	var gauge = new gaugelib.Gauge('metric-name');
	gauge.decrement();
	test.equal(-1, gauge.value() );
	test.done();
};

exports.set = function (test) {
	var gauge = new gaugelib.Gauge('metric-name');
	gauge.set(5);
	test.equal(5, gauge.value() );
	test.done();
};
