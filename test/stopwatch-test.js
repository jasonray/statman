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

exports.startAndReadStopwatch = function(test) {
	var stopwatch = new Stopwatch('mystopwatch');
	console.log('starting stopwatch');
	stopwatch.start();
	console.log('started stopwatch');
	setTimeout(function() {
		console.log('finishing stopwatch');
		var delta = stopwatch.read();
		// console.log('read stopwatch [%s]', delta);
		// test.equal(delta, 1000);
		test.done();
		console.log('done!');
	}, 1000);
};