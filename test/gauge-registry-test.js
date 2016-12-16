// var metrics = require('../lib/metrics');
//
// exports.activelyRegisterGauage = function(test) {
// 	var gauge = new metrics.Gauge('metric-name');
// 	metrics.register(gauge);
// 	test.equal('metric-name', gauge.name());
// 	test.done();
// };
//
// exports.retrieveGauage = function(test) {
// 	var gauge = new metrics.Gauge('metric-name');
// 	metrics.register(gauge);
// 	var retrievedGauge = metrics.registry('metric-name');
// 	test.equal('metric-name', gauge.name());
// 	test.done();
// };
//
// exports.modifyValueOfGauge = function(test) {
// 	var gauge = new metrics.Gauge('a');
// 	metrics.register(gauge);
//
// 	metrics.registry('a').set(5);
// 	metrics.registry('a').increment();
// 	metrics.registry('a').increment();
// 	metrics.registry('a').decrement(3);
// 	metrics.registry('a').increment(7);
//
// 	test.equal(11, metrics.registry('a').value());
// 	test.done();
// };
//
// exports.autoregister = function(test) {
// 	var gauge = metrics.gauges('auto');
//
// 	test.equal('auto', gauge.name());
// 	gauge.increment();
// 	test.equal(1, gauge.value());
//
// 	gauge2 = metrics.gauges('auto');
// 	test.equal('auto', gauge2.name());
// 	test.equal(1, gauge2.value());
//
// 	test.done();
// };