var statman = require('../lib/statman');
var assert = require('assert');
var should = require('should');

describe.only('registry', function () {

    it('get new instance of a gauge', function () {
        var gauge = statman.gauge('metric-name');
        gauge.name().should.equal('metric-name');
    });

    it('retrieve gauge from registry', function () {
        statman.gauge('metric-name').set(5);
        statman.gauge('metric-name').value().should.equal(5);
    });

    it('two gauges from registry', function () {
        statman.gauge('metric-name-1').set(50);
        statman.gauge('metric-name-2').set(5);
        statman.gauge('metric-name-1').increment();
        statman.gauge('metric-name-2').decrement();

        statman.gauge('metric-name-1').value().should.equal(51);
        statman.gauge('metric-name-2').value().should.equal(4);
    });

    it('reset', function () {
        statman.gauge('a').value().should.be.equal(0);
        statman.gauge('a').set(10);
        statman.gauge('a').value().should.be.equal(10);
        statman.reset();
        statman.gauge('a').value().should.be.equal(0);
    });


});