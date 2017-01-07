/*jslint node: true */
"use strict";

var statman = require('../lib/statman');
var defaultPrecision = 20;
var assert = require('assert');
var TestHelper = require('./testhelper');
var should = require('should');

describe('stopwatch', function () {
    this.timeout(5000);

    it('init should return an instance of stopwatch', function (done) {
        var stopwatch;
        stopwatch = new statman.Stopwatch();
        assert.ok(stopwatch);
        done();
    });

    it('start and read (100ms)', function (done) {
        var testtime = 100;

        var stopwatch = new statman.Stopwatch();
        stopwatch.start();
        setTimeout(function () {
            var delta = stopwatch.read();
            TestHelper.assertCloseEnough(testtime, delta, defaultPrecision);
            done();
        }, testtime);
    });

    it('start and read (10ms)', function (done) {
        var testtime = 10;

        var stopwatch = new statman.Stopwatch();
        stopwatch.start();
        setTimeout(function () {
            var delta = stopwatch.read();
            TestHelper.assertCloseEnough(testtime, delta, defaultPrecision);
            done();
        }, testtime);
    });

    it('autostart set to true automatically starts stopwatch', function (done) {
        var testtime = 10;

        var stopwatch = new statman.Stopwatch(true);
        setTimeout(function () {
            var delta = stopwatch.read();
            TestHelper.assertCloseEnough(testtime, delta, defaultPrecision);
            done();
        }, testtime);
    });

    it('autostart set to false does NOT automatically start stopwatch', function (done) {
        var testtime = 10;

        var stopwatch = new statman.Stopwatch(false);
        setTimeout(function () {
            var delta = stopwatch.read();
            assert.ok(isNaN(delta));
            done();
        }, testtime);
    });

    it('with two stopwatches, do independent reads of each', function (done) {
        var stopwatch1 = new statman.Stopwatch();
        var stopwatch2 = new statman.Stopwatch();

        stopwatch1.start();

        //start first stopwatch, then do a read .3s later
        var testtimeA = 300;
        setTimeout(function () {
            var delta1 = stopwatch1.read();
            TestHelper.assertCloseEnough(testtimeA, delta1, defaultPrecision);
        }, testtimeA);

        //start second stopwatch .1s second after the first, then do a read .5s later
        var testtimeB = 500;
        setTimeout(function () {
            stopwatch2.start();
            setTimeout(function () {
                var delta2 = stopwatch2.read();
                TestHelper.assertCloseEnough(testtimeB, delta2, defaultPrecision);
                done();
            }, testtimeB);
        }, 100);
    });

    it('start, stop, and read should return the time at stop', function (done) {
        var testtime = 100;

        var stopwatch = new statman.Stopwatch();
        stopwatch.start();
        setTimeout(function () {
            stopwatch.stop();

            setTimeout(function () {
                var delta = stopwatch.read();
                TestHelper.assertCloseEnough(testtime, delta, defaultPrecision);
                done();
            }, 500);
        }, testtime);
    });

    it('performing read without start() or stop() returns NaN', function (done) {
        var stopwatch = new statman.Stopwatch();
        assert.ok(isNaN(stopwatch.read()));
        done();
    });

    it('performing read without start() returns NaN', function (done) {
        var stopwatch = new statman.Stopwatch();
        stopwatch.stop();
        assert.ok(isNaN(stopwatch.read()));
        done();
    });

    it('executing stop twice should return time at second stop', function (done) {
        //start(), wait .1s, stop(), wait .2s, stop(), wait .5s, read(), ensure delta = .3s
        var stopwatch = new statman.Stopwatch();
        stopwatch.start();
        setTimeout(function () {
            stopwatch.stop();

            setTimeout(function () {
                TestHelper.assertCloseEnough(100 + 200, stopwatch.stop(), defaultPrecision);

                setTimeout(function () {
                    var delta = stopwatch.read();
                    TestHelper.assertCloseEnough(100 + 200, delta, defaultPrecision);
                    done();
                }, 500);
            }, 200);
        }, 100);
    });

    it('ensure that stop() returns time', function (done) {
        var testtime = 100;
        var stopwatch = new statman.Stopwatch();
        stopwatch.start();
        setTimeout(function () {
            var delta = stopwatch.stop();
            TestHelper.assertCloseEnough(testtime, delta, defaultPrecision);
            done();
        }, testtime);
    });
});

