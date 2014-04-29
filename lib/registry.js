var _gauges = [];

var gauges = function(metricname) {

	if (metricname) {
		for (var i = 0; i < _gauges.length; i++) {
			var g = _gauges[i];
			console.log('checking metric by name;' + metricname + ";" + g.name());
			if (g.name() === metricname) {
				return g;
			}
		}
	} else {
		var guagesObject = {};
		guagesObject.register = function(gauge) {
			_gauges.push(gauge);
			return gauge;
		};
		return guagesObject;
	}

};

exports.gauges = gauges;