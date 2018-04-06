/*jslint node: true */
"use strict";

const mocha = require('mocha');
var assert = require('assert');
var should = require('should');
var statman = require('../lib/statman');
var TestHelper = require('./testhelper');

describe('stopwatch (smoke test)', function () {
    beforeEach(function() {
       statman.reset();
    });
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

    it('explicit constructor (w/name and autostart)', function () {
        var stopwatch = new statman.Stopwatch('metric-name', true);
        should.exist(stopwatch.name());
        stopwatch.name().should.equal('metric-name');
    });

    it('implicit constructor', function () {
        var stopwatch = statman.stopwatch('metric-name');
        should.exists(stopwatch);
    });

    it('implicit constructor w/no name', function () {
        var stopwatch = statman.stopwatch();
        should.exists(stopwatch);
        should.exist(stopwatch.name());
    });

    it('name', function () {
        var stopwatch = new statman.Stopwatch('metric-name');
        assert.equal('metric-name', stopwatch.name());
    });

    it('access via registry', function () {
        var stopwatch = statman.stopwatch('metric-name');
        statman.registry('metric-name').start();
        statman.registry('metric-name').stop();
    });

    it('start and read (10ms)', function (done) {
        var testtime = 10;

        var stopwatch = new statman.Stopwatch();
        stopwatch.start();
        setTimeout(function () {
            var delta = stopwatch.read();
            verifyDelta(testtime, delta, 10);
            done();
        }, testtime);
    });

    it('autostart and read (10ms)', function (done) {
        var testtime = 10;

        var stopwatch = new statman.Stopwatch(true);
        setTimeout(function () {
            var delta = stopwatch.read();
            verifyDelta(testtime, delta, 10);
            done();
        }, testtime);
    });

    describe('toString()', function () {
        it('idle', function () {
            var stopwatch = statman.stopwatch('sw');
            //[sw => state:init; value:NaN]
            stopwatch.toString().should.containEql('state:init');
            stopwatch.toString().should.containEql('value:');
        });
        it('started', function () {
            var stopwatch = statman.stopwatch('sw');
            stopwatch.start();
            //[sw => state:running; value:0.01]
            stopwatch.toString().should.containEql('state:running');
            stopwatch.toString().should.containEql('value:');
        });
        it('stopped', function () {
            var stopwatch = statman.stopwatch('sw');
            stopwatch.start();
            stopwatch.stop();
            //[sw => state:stopped; value:0.01]
            stopwatch.toString().should.containEql('state:stopped');
            stopwatch.toString().should.containEql('value:');
        });
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