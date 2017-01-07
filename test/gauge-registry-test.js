var statman = require('../lib/statman');
var assert = require('assert');
var should = require('should');

describe('registry', function () {

    it.skip('get new instance of a gauge', function () {
        var gauge =  statman.Gauge('metric-name');
        gauge.name().should.equal('metric-name');
    });

    it.skip('retrieve gauge from registry', function () {
        var gauge = new statman.Gauge('metric-name');
        metrics.register(gauge);
        var retrievedGauge = metrics.registry('metric-name');
        assert.equal('metric-name', gauge.name());
    });

    it.skip('modifyValueOfGauge', function () {
        var gauge = new statman.Gauge('a');
        metrics.register(gauge);

        metrics.registry('a').set(5);
        metrics.registry('a').increment();
        metrics.registry('a').increment();
        metrics.registry('a').decrement(3);
        metrics.registry('a').increment(7);

        assert.equal(11, metrics.registry('a').value());
    });

    it.skip('autoregister', function () {
        var gauge = statman.gauges('auto');

        assert.equal('auto', gauge.name());
        gauge.increment();
        assert.equal(1, gauge.value());

        gauge2 = metrics.gauges('auto');
        assert.equal('auto', gauge2.name());
        assert.equal(1, gauge2.value());
    });

});