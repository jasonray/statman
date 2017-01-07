var metrics = require('../lib/statman');
var assert = require('assert');

describe('registry', function () {

    it('activelyRegisterGauage', function () {
        var gauge = new metrics.Gauge('metric-name');
        metrics.register(gauge);
        assert.equal('metric-name', gauge.name());
    });

    it('retrieveGauage', function () {
        var gauge = new metrics.Gauge('metric-name');
        metrics.register(gauge);
        var retrievedGauge = metrics.registry('metric-name');
        assert.equal('metric-name', gauge.name());
    });

    it('modifyValueOfGauge', function () {
        var gauge = new metrics.Gauge('a');
        metrics.register(gauge);

        metrics.registry('a').set(5);
        metrics.registry('a').increment();
        metrics.registry('a').increment();
        metrics.registry('a').decrement(3);
        metrics.registry('a').increment(7);

        assert.equal(11, metrics.registry('a').value());
    });

    it('autoregister', function () {
        var gauge = metrics.gauges('auto');

        assert.equal('auto', gauge.name());
        gauge.increment();
        assert.equal(1, gauge.value());

        gauge2 = metrics.gauges('auto');
        assert.equal('auto', gauge2.name());
        assert.equal(1, gauge2.value());
    });

});