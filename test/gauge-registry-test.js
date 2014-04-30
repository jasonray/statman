var metrics = require('../lib/metrics');

exports.activelyRegisterGauage = function(test) {
	var gauge = new metrics.gauge('metric-name');
	metrics.register(gauge);
	test.equal('metric-name', gauge.name());
	test.done();
};

exports.retrieveGauage = function(test) {
	var gauge = new metrics.gauge('metric-name');
	metrics.register(gauge);
	var retrievedGauge = metrics.registry('metric-name');
	test.equal('metric-name', gauge.name());
	test.done();
};

exports.modifyValueOfGauge = function(test) {
	var gauge = new metrics.gauge('a');
	metrics.register(gauge);

	metrics.registry('a').set(5);
	metrics.registry('a').increment();
	metrics.registry('a').increment();
	metrics.registry('a').decrement(3);
	metrics.registry('a').increment(7);

	test.equal(11, metrics.registry('a').value());
	test.done();
};

exports.autoregister = function(test) {
	var gaugeConstructor = function() {
		return new metrics.gauge('auto');
	};
	var gauge = metrics.registry('auto', gaugeConstructor);

	test.equal('auto', gauge.name());
	gauge.increment();
	test.equal(1, gauge.value());

	gauge2 = metrics.registry('auto', gaugeConstructor);
	test.equal('auto', gauge2.name());
	test.equal(1, gauge2.value());

	test.done();
};