# statman [![Build Status](https://travis-ci.org/jasonray/statman.svg?branch=master)](https://travis-ci.org/jasonray/statman) [![on npm](http://img.shields.io/npm/v/statman.svg?style=flat)](https://www.npmjs.org/package/statman) [![Greenkeeper badge](https://badges.greenkeeper.io/jasonray/statman.svg)](https://greenkeeper.io/) [![Dependency badge](https://david-dm.org/jasonray/statman.svg)](https://david-dm.org/jasonray/statman)
`statman` is a set of modules to assist with collection of metrics

# Supported metrics
* [gauge](https://github.com/jasonray/statman-gauge): represents a point in time measurement
* [meter](https://github.com/jasonray/statman-meter): measures flow, including count and average time
* [stopwatch](https://github.com/jasonray/statman-stopwatch): used to record timings

# Install it!
`statman` is decomposed into several smaller modules.  To utilize the metric modules, you have two choices
* access directly: this is recommended if there is one single metric package.  Like if you just want the stopwatch
* access via `statman`: this provides some capabilities such as a registry to easily access many metrics

## Option 1: access directly
Install using npm:
```
npm install statman-stopwatch
```

Reference in your app:
```
var Gauge = require('statman-stopwatch');
var gauge = Gauge('gauge-name');
```

## Option 2: access from `statman`
Install using npm:
```
npm install statman
```

Reference in your app:
```
var statman = require('statman');
var gauge = new statman.Gauge('gauge-name');
```

# Use it!
## Registry
`statman` provides a registry that allow for you to track your metrics.

You can manually add metrics to the registry.  For the built in metrics, you can also auto-register those while creating
```
// register a metric with a key
var metric = { ..some object.. }
statman.register('my metric name', metric)

// register a metric with implicit key = name
var metric2 = { name: 'my second metric' ..some object.. }
statman.register(metric2);

// access metric from registry
statman.registry('my metric name') //return metric
```

## Gauge
For the capabilities of `gauge` see: https://github.com/jasonray/statman-gauge

The following two approaches are equivalent
### Explicit creation of gauge
```
var gauge = statman.gauge('metric-name');
statman.regiser(gauge);
gauge.set(5);
```

### Create and register a gauge
```
statman.gauge('metric-name').set(5);   //if gauge by name 'metric-name' does not exist, create one, and set to '5'
statman.gauge('metric-name').value()   //return '5'
```

## Meter
[meter](https://github.com/jasonray/statman-meter)

## Stopwatch
[stopwatch](https://github.com/jasonray/statman-stopwatch)

# Extend it!
TODO: how to build a new metric

# Build it!
- Make sure that you have `node` and `npm` installed
- Clone source code to you local machine
- Setup dependencies: `npm install`
- run tests: `npm test`

# Roadmap
* Add meter
* Move stopwatch back to its own repo.  Sigh.
* Create reporters to output metrics
* Provide guidance how to hook with HTTP/TCP/async calls
* Provide hook to register with express
* Integrate with visualizations
* Provide web interface to access metrics
