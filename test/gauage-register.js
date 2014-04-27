var registry = require('../lib/registry');

exports.activelyRegisterGauage = function(test) {
	// var gauage = registry.guages.register('metric-name');
	var gauges = registry.gauges();
	var gauge = gauges.register('metric-name');
	test.equal('metric-name', gauge.name());
	test.done();
};