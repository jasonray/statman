/*jslint node: true */
"use strict";

var Stopwatch = require('../lib/metrics').Stopwatch;
var defaultPrecision = 5;

exports.startAndReadStopwatch1000 = function(test) {
    var stopwatch = new Stopwatch();
    stopwatch.start();
    setTimeout(function() {
        var delta = stopwatch.read();
        verifyDelta(test, 1000, delta, defaultPrecision);
        test.done();
    }, 1000);
};

exports.autostart = function(test) {
    var stopwatch = new Stopwatch(true);
    setTimeout(function() {
        var delta = stopwatch.read();
        verifyDelta(test, 1000, delta, defaultPrecision);
        test.done();
    }, 1000);
};

exports.utilizeStop = function(test) {
    var stopwatch = new Stopwatch();
    stopwatch.start();
    setTimeout(function() {
        stopwatch.stop();

        setTimeout(function() {
            var delta = stopwatch.read();
            verifyDelta(test, 1000, delta, defaultPrecision);
            test.done();
        }, 1000);
    }, 1000);
};

function verifyDelta(test, expected, actual, acceptedVariance) {
    var lowerThreshold = expected - acceptedVariance;
    var upperThreshold = expected + acceptedVariance;
    var message = "Expected " + expected + " ± " + acceptedVariance + ", was " + actual + ".";
    test.ok((actual >= lowerThreshold) && (actual <= upperThreshold), message);
}