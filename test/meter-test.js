/*jslint node: true */
"use strict";

var Meter = require('../lib/metric/Meter');
var mocha = require('mocha');
var assert = require('assert');

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


});
