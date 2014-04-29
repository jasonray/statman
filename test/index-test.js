/*jslint node: true */
"use strict";

var metrics = require('../index');

exports.initGauge = function(test) {
	var gauge = new metrics.gauge('metric-name');
	gauge.increment();
	test.equal(1, gauge.value());
	test.done();
};