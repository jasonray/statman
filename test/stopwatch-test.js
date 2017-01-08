/*jslint node: true */
"use strict";

var mocha = require('mocha');
var assert = require('assert');
var should = require('should');
var statman = require('../lib/statman');
var TestHelper = require('./testhelper');

describe.only('stopwatch (smoke test)', function () {
    it('explicit constructor', function () {
        var stopwatch = new statman.Stopwatch('metric-name');
        should.exists(stopwatch);
    });

    it('explicit constructor (w/no name or autostart)', function () {
        var stopwatch = new statman.Stopwatch();
        should.exist(stopwatch.name());
    });

    it('explicit constructor (w/autostart)', function () {
        var stopwatch = new statman.Stopwatch(true);
        should.exist(stopwatch.name());
        stopwatch.name().should.not.equal(true);
    });

    it.skip('explicit constructor (w/name and autostart)', function () {
        var stopwatch = new statman.Stopwatch('metric-name', true);
        should.exist(stopwatch.name());
        stopwatch.name().should.equal('metric-name');
    });

    it.skip('implicit constructor', function () {
        var stopwatch = statman.stopwatch('metric-name');
        should.exists(stopwatch);
    });

    it.skip('implicit constructor w/no name', function () {
        var stopwatch = statman.stopwatch();

        console.log('stopwatch:',stopwatch);

        should.exists(stopwatch);
        should.exist(stopwatch.name());
    });

    it.skip('name', function () {
        var stopwatch = new statman.Stopwatch('metric-name');
        assert.equal('metric-name', stopwatch.name());
    });

    it.skip('access via registry', function () {
        var stopwatch = statman.stopwatch('metric-name');
        statman.registry('metric-name').start();
        statman.registry('metric-name').stop();
    });

    it.skip('start and read (10ms)', function (done) {
        var testtime = 10;

        var stopwatch = new statman.Stopwatch();
        stopwatch.start();
        setTimeout(function () {
            var delta = stopwatch.read();
            verifyDelta(testtime, delta, defaultPrecision);
            done();
        }, testtime);
    });

    it.skip('toString produces something ', function () {
        var stopwatch = statman.stopwatch('metric-name');
        gauge.toString().should.containEql("stopped");
    });
});

//TODO:
//replace with: statman.TestHelper.assertCloseEnough(testtime, delta, defaultPrecision);
function verifyDelta(expected, actual, acceptedVariance) {
    var lowerThreshold = expected - acceptedVariance;
    var upperThreshold = expected + acceptedVariance;
    var message = "Expected " + expected + " ± " + acceptedVariance + ", was " + actual + ".";
    assert.ok((actual >= lowerThreshold) && (actual <= upperThreshold), message);
}