var uuid = require('node-uuid');
var now = require("performance-now")

function Stopwatch(name, autostart) {
	var self = this;
	if (!name) name = uuid.v4();
	self.name = name;
	if (autostart) self.start();
}

Stopwatch.prototype.start = function() {
	self.startTime = now();
	console.log('started at ' + self.startTime);
}

Stopwatch.prototype.read = function() {
	var nowTime = now();
	var delta = calculateDelta(self.startTime, nowTime);
	console.log('calculated delta: %s, %s => %s', self.startTime, nowTime, delta);
	return delta;

	function calculateDelta(start, end) {
		return start - end;
	}
}

module.exports = Stopwatch;