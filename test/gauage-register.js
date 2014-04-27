var registry = require('../lib/registry');

exports.activelyRegisterGauage = function(test) {
	var gauge = registry.gauges().register('metric-name');
	test.equal('metric-name', gauge.name());
	test.done();
};

exports.retrieveGauage = function(test) {
	registry.gauges().register('metric-name');
	var gauge = registry.gauges('metric-name');
	test.equal('metric-name', gauge.name());
	test.done();
};