var uuid = require('node-uuid');
var now = require("performance-now")

function Stopwatch(name, autostart) {
    var self = this;
    if (!name) name = uuid.v4();
    self.name = name;
    if (autostart) self.start();
}

Stopwatch.prototype.start = function() {
    var self = this;
    self.startTime = now();
    console.log('starting stopwatch %s at %s ', self.name, self.startTime);
}

Stopwatch.prototype.read = function() {
    var self = this;
    var startTime = self
    var nowTime = now();
    var delta = calculateDelta(self.startTime, nowTime);
    console.log('reading stopwatch %s at %s for reading of %s ', self.name, nowTime, delta);
    return delta;

    function calculateDelta(start, end) {
        return end - start;
    }
}

module.exports = Stopwatch;