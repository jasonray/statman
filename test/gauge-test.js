/*jslint node: true */
"use strict";

const mocha = require('mocha');
const assert = require('assert');
const should = require('should');
const statman = require('../lib/statman');

describe('gauge (smoke test)', function () {
    it('gauagename', function () {
        const gauge = new statman.Gauge('metric-name');
        assert.equal('metric-name', gauge.name());
    });

    it('increment', function () {
        const gauge = new statman.Gauge('metric-name');
        gauge.increment();
        assert.equal(1, gauge.value());
    });

    it('incrementByValue', function () {
        const gauge = new statman.Gauge('metric-name');
        gauge.set(10);
        gauge.increment(2);
        assert.equal(12, gauge.value());
    });

    it('decrement', function () {
        const gauge = new statman.Gauge('metric-name');
        gauge.set(10);
        gauge.decrement();
        assert.equal(9, gauge.value());
    });

    it('decrementByValue', function () {
        const gauge = new statman.Gauge('metric-name');
        gauge.set(10);
        gauge.decrement(2);
        assert.equal(8, gauge.value());
    });

    it('set', function () {
        const gauge = new statman.Gauge('metric-name');
        gauge.set(5);
        assert.equal(5, gauge.value());
    });

    it('toString produces something with the value', function () {
        const gauge = new statman.Gauge('metric-name');
        gauge.set(5);
        gauge.toString().should.containEql(5);
    });

});
