/*jslint node: true */
"use strict";

var Stopwatch = require('../lib/Stopwatch');

exports.initStopwatch = function(test) {
	var stopwatch = new Stopwatch('mystopwatch');
	test.equal(stopwatch.name, 'mystopwatch');
	test.done();
};

exports.initStopwatchWithoutName = function(test) {
	var stopwatch = new Stopwatch();
	test.ok(stopwatch.name !== undefined);
	test.done();
};