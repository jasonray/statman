/*jslint node: true */
"use strict";

var Gauge = require('statman-gauge');
var mocha = require('mocha');
var assert = require('assert');
var should = require('should');
var statman = require('../lib/statman');

describe('gauge (smoke test)', function () {
    it('gauagename', function () {
        var gauge = new Gauge('metric-name');
        assert.equal('metric-name', gauge.name());
    });

    it('increment', function () {
        var gauge = new Gauge('metric-name');
        gauge.increment();
        assert.equal(1, gauge.value());
    });

    it('incrementByValue', function () {
        var gauge = new Gauge('metric-name');
        gauge.set(10);
        gauge.increment(2);
        assert.equal(12, gauge.value());
    });

    it('decrement', function () {
        var gauge = new Gauge('metric-name');
        gauge.set(10);
        gauge.decrement();
        assert.equal(9, gauge.value());
    });

    it('decrementByValue', function () {
        var gauge = new Gauge('metric-name');
        gauge.set(10);
        gauge.decrement(2);
        assert.equal(8, gauge.value());
    });

    it('set', function () {
        var gauge = new Gauge('metric-name');
        gauge.set(5);
        assert.equal(5, gauge.value());
    });

    it('toString produces something with the value', function () {
        var gauge = new Gauge('metric-name');
        gauge.set(5);
        gauge.toString().should.containEql(5);
    });

});
