statman
=======
Package to assist with collection of metrics

Installation
============
Install using npm:
```
npm install statman
```

To use:
```
var metrics = require('statman');
```

Stopwatch
=========
Stopwatch is useful for determining the amount of time it takes to perform an activity.

```
    var metrics = require('statman');
    var stopwatch = new metrics.Stopwatch('stopwatch name');
    stopwatch.start();

    // do some activity

    var delta = stopwatch.read();
```

Gauge
=====
Based upon [codehale metric package](http://metrics.codahale.com/getting-started/#gauges), a gauge is an instanteous measurement.

Suppose that we want to create a gauage that measures that size of a queue.  The below indicates how to register this.

Register and using a gauge
--------------------------
### Method 1
```
var gauge = new Gauge('queueSize');
metrics.gauges.register(gauge);

function enqueue(message) {
	data.push(message);
	metrics.gauges('queueSize').increment();
}

function dequeue() {
	data.pop(message);
	metrics.gauges('queueSize').decrement();
}
```

### Method 2
```
var gauge = new Gauge('queueSize');
metrics.gauges.register(gauge);

function enqueue(message) {
	data.push(message);
	gauge.increment();
}

function dequeue() {
	data.pop(message);
	gauge.decrement();
}
```

### Method 3
```
var gauge = new Gauge('queueSize', function() {
	return data.size();
});
metrics.gauges.register(gauge);

function enqueue(message) {
	data.push(message);
	gauge.increment();
}

function dequeue() {
	data.pop(message);
	gauge.decrement();
}
```

Increment
---------
```
var gauge = new metrics.gauge('metric-name');
gauge.increment();  //increment by 1
gauge.increment(10); //increment by 10
```

Decrement
---------
```
var gauge = new metrics.gauge('metric-name');
gauge.decrement();  //decrement by 1
gauge.decrement(10); //decrement by 10
```

Set
---
```
var gauge = new metrics.gauge('metric-name');
gauge.set(5);
```

Value
-----
To get gauge value:
```
gauge.value();
```

Development
===========
To run the unit tests: `npm test`
