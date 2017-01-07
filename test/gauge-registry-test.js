var statman = require('../lib/statman');
var assert = require('assert');
var should = require('should');

describe.only('registry', function () {

    it('registry returns full list', function () {
        var metricA = {};
        var metricB = {};
        statman.register(metricA);
        statman.register(metricB);
        statman.registry().length.should.be.equal(2);
    });

    it('registry returns single item', function() {
        var metricA = {getName: function() {return 'metric-a'}};
        var metricB = {getName: function() {return 'metric-b'}};
        statman.register(metricA);
        statman.register(metricB);
        statman.registry('metric-a').should.be.equal(metricA);
    });

    it('reset', function () {
        statman.gauge('a').value().should.be.equal(0);
        statman.gauge('a').set(10);
        statman.gauge('a').value().should.be.equal(10);
        statman.reset();
        statman.gauge('a').value().should.be.equal(0);
    });

    describe.only('gauge', function () {
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

        it('registering metric with same name overwrites the first')

        it('cannot register gauge without name')
    });






});