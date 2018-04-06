/*jslint node: true */
"use strict";

const mocha = require('mocha');
const assert = require('assert');
const should = require('should');
const statman = require('../lib/statman');
const verifyDelta = require('./testhelper').assertCloseEnough;

describe('stopwatch (smoke test)', function () {
    beforeEach(function() {
       statman.reset();
    });
    it('explicit constructor', function () {
        const stopwatch = new statman.Stopwatch('metric-name');
        should.exists(stopwatch);
    });

    it('explicit constructor (w/no name or autostart)', function () {
        const stopwatch = new statman.Stopwatch();
        should.exist(stopwatch.name());
    });

    it('explicit constructor (w/autostart)', function () {
        const stopwatch = new statman.Stopwatch(true);
        should.exist(stopwatch.name());
        stopwatch.name().should.not.equal(true);
    });

    it('explicit constructor (w/name and autostart)', function () {
        const stopwatch = new statman.Stopwatch('metric-name', true);
        should.exist(stopwatch.name());
        stopwatch.name().should.equal('metric-name');
    });

    it('implicit constructor', function () {
        const stopwatch = statman.stopwatch('metric-name');
        should.exists(stopwatch);
    });

    it('implicit constructor w/no name', function () {
        const stopwatch = statman.stopwatch();
        should.exists(stopwatch);
        should.exist(stopwatch.name());
    });

    it('name', function () {
        const stopwatch = new statman.Stopwatch('metric-name');
        assert.equal('metric-name', stopwatch.name());
    });

    it('access via registry', function () {
        const stopwatch = statman.stopwatch('metric-name');
        statman.registry('metric-name').start();
        statman.registry('metric-name').stop();
    });

    it('start and read (10ms)', function (done) {
        const testtime = 10;

        const stopwatch = new statman.Stopwatch();
        stopwatch.start();
        setTimeout(function () {
            var delta = stopwatch.read();
            verifyDelta(testtime, delta, 10);
            done();
        }, testtime);
    });

    it('autostart and read (10ms)', function (done) {
        const testtime = 10;

        const stopwatch = new statman.Stopwatch(true);
        setTimeout(function () {
            var delta = stopwatch.read();
            verifyDelta(testtime, delta, 10);
            done();
        }, testtime);
    });

    describe('toString()', function () {
        it('idle', function () {
            const stopwatch = statman.stopwatch('sw');
            //[sw => state:init; value:NaN]
            stopwatch.toString().should.containEql('state:init');
            stopwatch.toString().should.containEql('value:');
        });
        it('started', function () {
            const stopwatch = statman.stopwatch('sw');
            stopwatch.start();
            //[sw => state:running; value:0.01]
            stopwatch.toString().should.containEql('state:running');
            stopwatch.toString().should.containEql('value:');
        });
        it('stopped', function () {
            const stopwatch = statman.stopwatch('sw');
            stopwatch.start();
            stopwatch.stop();
            //[sw => state:stopped; value:0.01]
            stopwatch.toString().should.containEql('state:stopped');
            stopwatch.toString().should.containEql('value:');
        });
    });
});