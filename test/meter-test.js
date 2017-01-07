/*jslint node: true */
"use strict";

var metrics = require('../lib/statman');
var mocha = require('mocha');
var assert = require('assert');
var StopWatch = require('../lib/metric/Stopwatch');
var _ = require('underscore');
var TestHelper = require('./testhelper');

describe('meter smoketest', function () {
    this.timeout(5000);

    it('init should return an instance of meter', function () {
        var meter;
        meter = new metrics.Meter();
        assert.ok(meter);
    });

    it('record once and get count should return 1', function () {
        var meter;
        meter = new metrics.Meter();
        meter.record();
        assert.equal(meter.getCount(), 1);
    });

    it('record and read', function () {
        var meter;
        meter = new metrics.Meter();
        meter.record(1000);
        meter.record(2000);
        meter.getAverage().should.equal(1500);
        meter.getCount().should.equal(2);
    });

    it('meter.start() provides an event, which can be used to auto record meter', function (done) {
        var meter = new metrics.Meter();

        var meterEvent = meter.startEvent();
        setTimeout(function () {
            meterEvent.stop();

            meter.getCount().should.equal(1);
            meter.getAverage().should.within(200, 220); //allow for some timing to be off, setTimeout not exact science
            done();
        }, 200);

    });

    it('toString()', function () {
        var meter;
        meter = new metrics.Meter();
        meter.record(2.2);
        meter.record(4.4);
        meter.toString().should.equal('[count:2; average:3.30]');
    });


});
