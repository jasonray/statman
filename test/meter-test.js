/*jslint node: true */
"use strict";

var Meter = require('../lib/metric/Meter');
var mocha = require('mocha');
var assert = require('assert');
var StopWatch = require('../lib/metric/Stopwatch');
var _ = require('underscore');
var TestHelper = require('./testhelper');

describe('meter', function () {
    this.timeout(5000);

    it('init should return an instance of meter', function () {
        var meter;
        meter = new Meter();
        assert.ok(meter);
    });

    it('record once and get count should return 1', function () {
        var meter;
        meter = new Meter();
        meter.record();
        assert.equal(meter.getCount(), 1);
    });

    it('record twice and get count should return 2', function () {
        var meter;
        meter = new Meter();
        meter.record();
        meter.record();
        assert.equal(meter.getCount(), 2);
    });

    it('if record contains a number, provide this number in average', function () {
        var meter;
        meter = new Meter();
        meter.record(5);
        assert.equal(meter.getAverage(), 5);
    });

    it('if record contains integer numbers, provide this number in average', function () {
        var meter;
        meter = new Meter();
        meter.record(2);
        meter.record(4);
        assert.equal(meter.getAverage(), 3);
    });

    it('if record contains decimal numbers, provide this number in average', function () {
        var meter;
        meter = new Meter();
        meter.record(2.2);
        meter.record(4.4);
        TestHelper.assertCloseEnough(meter.getAverage(), 3.3);
    });

    it('given record using stopwatch, average should still return averages', function (done) {
        var meter = new Meter();
        var sw1 = new StopWatch();
        sw1.start();
        setTimeout(function () {
            sw1.stop();
            console.log('about to record %s', sw1);
            meter.record(sw1);
        }, 200);

        var sw2 = new StopWatch();
        sw2.start();
        setTimeout(function () {
            sw2.stop();
            console.log('about to record %s', sw2);
            meter.record(sw2);
        }, 400);

        setTimeout(function () {
            TestHelper.assertCloseEnough(meter.getCount(), 2);
            TestHelper.assertCloseEnough(meter.getAverage(), 300);
            done();
        }, 500);
    });


});
