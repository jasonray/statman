var registry = require('../lib/registry');
var gaugelib = require('../lib/gauge');

exports.activelyRegisterGauage = function(test) {
	var gauge = new gaugelib.Gauge('metric-name');
	registry.gauges().register(gauge);
	test.equal('metric-name', gauge.name());
	test.done();
};

exports.retrieveGauage = function(test) {
	var gauge = new gaugelib.Gauge('metric-name');
	registry.gauges().register(gauge);
	var retrievedGauge = registry.gauges('metric-name');
	test.equal('metric-name', gauge.name());
	test.done();
};

exports.modifyValueOfGauge = function(test) {
	var gauge = new gaugelib.Gauge('a');
	registry.gauges().register(gauge);

	registry.gauges('a').set(5);
	registry.gauges('a').increment();
	registry.gauges('a').increment();
	registry.gauges('a').decrement(3);
	registry.gauges('a').increment(7);

	test.equal(11, registry.gauges('a').value());
	test.done();
};
