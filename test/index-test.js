/*jslint node: true */
"use strict";

var metrics = require('../lib/metrics');
var mocha = require('mocha');
var assert = require('assert');

describe('index', function () {

    it('initGauge', function () {
        var gauge = new metrics.Gauge('metric-name');
        gauge.increment();
        assert.equal(1, gauge.value());
    });

    it('registerGauge', function () {
        var gauge = new metrics.Gauge('metric-name');
        metrics.register(gauge);
        gauge.increment();
        asset.equal(1, gauge.value());
    });
});

