var metrics = require('../index');

exports.activelyRegisterGauage = function(test) {
	var gauge = new metrics.gauge('metric-name');
	metrics.registry.gauges().register(gauge);
	test.equal('metric-name', gauge.name());
	test.done();
};

exports.retrieveGauage = function(test) {
	var gauge = new metrics.gauge('metric-name');
	metrics.registry.gauges().register(gauge);
	var retrievedGauge = metrics.registry.gauges('metric-name');
	test.equal('metric-name', gauge.name());
	test.done();
};

exports.modifyValueOfGauge = function(test) {
	var gauge = new metrics.gauge('a');
	metrics.registry.gauges().register(gauge);

	metrics.registry.gauges('a').set(5);
	metrics.registry.gauges('a').increment();
	metrics.registry.gauges('a').increment();
	metrics.registry.gauges('a').decrement(3);
	metrics.registry.gauges('a').increment(7);

	test.equal(11, metrics.registry.gauges('a').value());
	test.done();
};
