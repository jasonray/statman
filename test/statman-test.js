const statman = require('../lib/statman');
const assert = require('assert');
const should = require('should');

describe('registry', function () {
    beforeEach(function () {
        statman.reset();
    });

    it('registry() => returns full list of metrics', function () {
        const metricA = {name: 'metricA'};
        const metricB = {name: 'metricB'};
        const metricC = {name: 'metric-C'};
        statman.register(metricA);
        statman.register(metricB);
        statman.register(metricC);
        statman.registry().length.should.equal(3);
    });

    it('registry(name) => returns single item', function () {
        const metricA = {name: 'metricA'};
        const metricB = {name: 'metricB'};
        const metricC = {name: 'metric-C'};
        statman.register(metricA);
        statman.register(metricB);
        statman.register(metricC);
        statman.registry('metricA').should.equal(metricA);
        statman.registry('metricB').should.equal(metricB);
        statman.registry('metric-C').should.equal(metricC);
    });

    it('registry can have key passed explicitly', function () {
        const metric = {value: 'abc'};

        const metricA = {name: 'metricA'};
        const metricB = {name: 'metricB'};
        const metricC = {name: 'metric-C'};
        statman.register(metricA);
        statman.register(metricB);
        statman.register(metricC);

        statman.register('x', metric);
        statman.registry('x').should.equal(metric);
    });

    it('registry can have key discovered from name', function () {
        const metric = {name: 'x'};

        const metricA = {name: 'metricA'};
        const metricB = {name: 'metricB'};
        const metricC = {name: 'metric-C'};
        statman.register(metricA);
        statman.register(metricB);
        statman.register(metricC);

        statman.register(metric);
        statman.registry('x').should.equal(metric);
    });

    it('registry can have key discovered from name()', function () {
        const metric = {
            name: function () {
                return 'x'
            }
        };

        const metricA = {name: 'metricA'};
        const metricB = {name: 'metricB'};
        const metricC = {name: 'metric-C'};
        statman.register(metricA);
        statman.register(metricB);
        statman.register(metricC);

        statman.register(metric);
        statman.registry('x').should.equal(metric);
    });

    it('registry can have key discovered from getName()', function () {
        const metric = {
            getName: function () {
                return 'x'
            }
        };

        const metricA = {name: 'metricA'};
        const metricB = {name: 'metricB'};
        const metricC = {name: 'metric-C'};
        statman.register(metricA);
        statman.register(metricB);
        statman.register(metricC);

        statman.register(metric);
        statman.registry('x').should.equal(metric);
    });

    it('registering metric with same name overwrites the first', function () {
        const metricA = {
            name: function () {
                return 'metric-a'
            }, value: 1
        };
        const metricB = {
            name: function () {
                return 'metric-a'
            }, value: 2
        };
        statman.register(metricA);
        statman.register(metricB);
        statman.registry('metric-a').should.be.equal(metricB);
    });

    it('cannot register gauge without name', function () {
        assert.throws(function () {
            statman.register({value: 1});
        })
    });


    it('reset', function () {
        statman.gauge('a').value().should.be.equal(0);
        statman.gauge('a').set(10);
        statman.gauge('a').value().should.be.equal(10);
        statman.reset();
        statman.gauge('a').value().should.be.equal(0);
    });

    describe('gauge in registry', function () {
        it('get new instance of a gauge', function () {
            const gauge = statman.gauge('metric-name');
            gauge.name().should.equal('metric-name');
        });

        it('explicit register gauge', function () {
            const gauge = new statman.Gauge('metric-name');
            should.not.exist(statman.registry('metric-name'));
            statman.register(gauge);
            should.exist(statman.registry('metric-name'));
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
    });

    describe('meter in registry', function () {
        it('get new instance of a meter', function () {
            const meter = statman.meter('metric-name');
            meter.name().should.equal('metric-name');
        });

        it('explicit register meter', function () {
            const meter = new statman.Meter('metric-name');
            should.not.exist(statman.registry('metric-name'));
            statman.register(meter);
            should.exist(statman.registry('metric-name'));
        });

        it('retrieve meter from registry', function () {
            statman.meter('metric-name').getCount().should.equal(0);
            statman.meter('metric-name').record()
            statman.meter('metric-name').getCount().should.equal(1);
        });

        it('two gauges from registry', function () {
            statman.meter('metric-name-1').record(50);
            statman.meter('metric-name-2').record(5);
            statman.meter('metric-name-1').record(100);
            statman.meter('metric-name-2').record(10);

            statman.meter('metric-name-1').getAverage().should.equal(75);
            statman.meter('metric-name-2').getAverage().should.equal(7.5);
        });
    });


});