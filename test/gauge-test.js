/*jslint node: true */
"use strict";

var Gauge = require('../lib/Gauge2');
var mocha = require('mocha');
var assert = require('assert');

describe('gauge', function () {
    it('gauagename', function () {
        var gauge = new Gauge('metric-name');
        assert.equal('metric-name', gauge.name());
    });

    it('initializesTo0', function () {
        var gauge = new Gauge('metric-name');
        assert.equal(0, gauge.value());
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
        gauge.decrement();
        assert.equal(-1, gauge.value());
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

    function testSetWithInvalidInput(test, input) {
        var gauge = new Gauge('metric-name');
        assert.throws(function () {
            gauge.set('str');
        }, Error, "`set` should throw exception if passed non-numeric value");
    }

    it('setNotAllowString', function () {
        var input = "str";
        testSetWithInvalidInput(input);
    });

    it('setNotAllowNull', function () {
        var input = null;
        testSetWithInvalidInput(input);
    });

    it('setNotAllowUninitialized', function () {
        var input;
        testSetWithInvalidInput(input);
    });

    it('allowCustomValueFunction', function () {
        var customValueFunction = function () {
            return 5;
        }

        var gauge = new Gauge('metric-name', customValueFunction);
        assert.equal(5, gauge.value());
    });

    it('disallowNonFunctionForCustomValueFunction', function () {
        assert.throws(function () {
            var gauge = new Gauge('metric-name', 5);
        });
    });

    it('twoGauage', function () {
        var gaugeA = new Gauge('metric-name');
        gaugeA.set(5);
        gaugeA.increment();
        gaugeA.increment();
        gaugeA.decrement();

        var gaugeB = new Gauge('metric-name');
        gaugeB.set(10);
        gaugeB.increment();
        gaugeB.decrement();
        gaugeB.decrement();

        assert.equal(6, gaugeA.value());
        assert.equal(9, gaugeB.value());
    });

});
