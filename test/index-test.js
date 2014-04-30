/*jslint node: true */
"use strict";

var metrics = require('../lib/metrics');

exports.initGauge = function(test) {
	var gauge = new metrics.gauge('metric-name');
	gauge.increment();
	test.equal(1, gauge.value());
	test.done();
};

exports.registerGauge = function(test) {
	var gauge = new metrics.gauge('metric-name');
	metrics.register(gauge);
	gauge.increment();
	test.equal(1, gauge.value());
	test.done();
};

