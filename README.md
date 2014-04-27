statman
=======
Package to assist with collection of metrics

Installation
============
TBD



Gauge
=====
Based upon [codehale metric package](http://metrics.codahale.com/getting-started/#gauges), a gauge is an instanteous measurement.

Suppose that we want to create a gauage that measures that size of a queue.  The below indicates how to regsiter this.

Register a gauge
-----------------
### Method 1
metrics.gauges.register('queueSize');

function enqueue(message) {
	data.push(message);
	metrics.gauges('queueSize').increment();
}

function dequeue() {
	data.pop(message);
	metrics.gauges('queueSize').decrement();
}

### Method 2
var gauge = metrics.gauges.register('queueSize');

function enqueue(message) {
	data.push(message);
	gauge.increment();
}

function dequeue() {
	data.pop(message);
	gauge.decrement();
}

### Method 3
metrics.gauges.register('queueSize', function() {
	return data.size();
})

function enqueue(message) {
	data.push(message);
	gauge.increment();
}

function dequeue() {
	data.pop(message);
	gauge.decrement();
}

Increment
---------
```
var gauge = new gaugelib.Gauge('metric-name');
gauge.increment();  //increment by 1
gauge.increment(10); //increment by 10
```

Decrement
---------
```
var gauge = new gaugelib.Gauge('metric-name');
gauge.decrement();  //decrement by 1
gauge.decrement(10); //decrement by 10
```

Set
---
```
var gauge = new gaugelib.Gauge('metric-name');
gauge.set(5);
```

Value
-----
To get gauge value:
```
gague.value();
```

Development
===========
run the unit tests: `./runtest.sh`
