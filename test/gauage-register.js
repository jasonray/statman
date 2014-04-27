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