/*jslint node: true */
"use strict";

const statman = require('../lib/statman');
const should = require('should');

describe('meter (smoke test)', function () {
    this.timeout(5000);

    it('init should return an instance of meter', function () {
        const meter = new statman.Meter();
        should.exist(meter);
    });

    it('record once and get count should return 1', function () {
        const meter = new statman.Meter();
        meter.record();
        meter.getCount().should.be.equal(1);
    });

    it('record and read', function () {
        const meter = new statman.Meter();
        meter.record(1000);
        meter.record(2000);
        meter.getAverage().should.equal(1500);
        meter.getCount().should.equal(2);
    });

    it('meter.start() provides an event, which can be used to auto record meter', function (done) {
        const meter = new statman.Meter();

        const meterEvent = meter.startEvent();
        setTimeout(function () {
            meterEvent.stop();

            meter.getCount().should.equal(1);
            meter.getAverage().should.within(200, 220); //allow for some timing to be off, setTimeout not exact science
            done();
        }, 200);

    });

    it('toString()', function () {
        const meter = new statman.Meter();
        meter.record(2.2);
        meter.record(4.4);
        meter.toString().should.equal('[count:2; average:3.30]');
    });


});
