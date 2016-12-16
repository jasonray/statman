/*jslint node: true */
"use strict";

var metrics = require('../lib/metrics');

exports.hello = function(test) {
    test.equals(1, 1);
    test.done();
};

exports.gauagename = function(test) {
    var gauge = new metrics.Gauge('metric-name');
    test.equal('metric-name', gauge.name());
    test.done();
};

exports.initializesTo0 = function(test) {
    var gauge = new metrics.Gauge('metric-name');
    test.equal(0, gauge.value());
    test.done();
};

exports.increment = function(test) {
    var gauge = new metrics.Gauge('metric-name');
    gauge.increment();
    test.equal(1, gauge.value());
    test.done();
};

exports.incrementByValue = function(test) {
    var gauge = new metrics.Gauge('metric-name');
    gauge.set(10);
    gauge.increment(2);
    test.equal(12, gauge.value());
    test.done();
};

exports.decrement = function(test) {
    var gauge = new metrics.Gauge('metric-name');
    gauge.decrement();
    test.equal(-1, gauge.value());
    test.done();
};

exports.decrementByValue = function(test) {
    var gauge = new metrics.Gauge('metric-name');
    gauge.set(10);
    gauge.decrement(2);
    test.equal(8, gauge.value());
    test.done();
};

exports.set = function(test) {
    var gauge = new metrics.Gauge('metric-name');
    gauge.set(5);
    test.equal(5, gauge.value());
    test.done();
};

function testSetWithInvalidInput(test, input) {
    var gauge = new metrics.Gauge('metric-name');
    test.throws(function() {
        gauge.set('str');
    }, Error, "`set` should throw exception if passed non-numeric value");
    test.done();
}

exports.setNotAllowString = function(test) {
    var input = "str";
    testSetWithInvalidInput(test, input);
};

exports.setNotAllowNull = function(test) {
    var input = null;
    testSetWithInvalidInput(test, input);
};

exports.setNotAllowUninitialized = function(test) {
    var input;
    testSetWithInvalidInput(test, input);
};

exports.allowCustomValueFunction = function(test) {
    var customValueFunction = function() {
        return 5;
    };

    var gauge = new metrics.Gauge('metric-name', customValueFunction);
    test.equal(5, gauge.value());
    test.done();
};

exports.disallowNonFunctionForCustomValueFunction = function(test) {
    test.throws(function() {
        var gauge = new metrics.Gauge('metric-name', 5);
    });

    test.done();
};

exports.twoGauage = function(test) {
    var gaugeA = new metrics.Gauge('metric-name');
    gaugeA.set(5);
    gaugeA.increment();
    gaugeA.increment();
    gaugeA.decrement();

    var gaugeB = new metrics.Gauge('metric-name');
    gaugeB.set(10);
    gaugeB.increment();
    gaugeB.decrement();
    gaugeB.decrement();

    test.equal(6, gaugeA.value());
    test.equal(9, gaugeB.value());
    test.done();
};