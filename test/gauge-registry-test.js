var statman = require('../lib/statman');
var assert = require('assert');
var should = require('should');

describe('registry', function () {

    it.skip('get new instance of a gauge', function () {
        var gauge =  statman.gauge('metric-name');
        gauge.name().should.equal('metric-name');
    });

    it.skip('retrieve gauge from registry', function () {
        statman.gauge('metric-name').set(5);
        statman.gauge('metric-name').value().should.equal(5);
    });

    it.skip('two gauges from registry', function () {
        statman.gauge('metric-name-1').set(50);
        statman.gauge('metric-name-2').set(5);
        statman.gauge('metric-name-1').increment();
        statman.gauge('metric-name-2').decrement();

        statman.gauge('metric-name-1').value().should.equal(51);
        statman.gauge('metric-name-2').value().should.equal(4);
    });

});