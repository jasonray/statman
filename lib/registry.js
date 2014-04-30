var _metrics = [];

exports.register = function(metric) {
	guagesObject.register = function(gauge) {
		_gauges.push(gauge);
	};
};



if (metricname) {
	for (var i = 0; i < _gauges.length; i++) {
		var g = _gauges[i];
		console.log('checking metric by name;' + metricname + ";" + g.name());
		if (g.name() === metricname) {
			return g;
		}
	}
} else {}

};

exports.register = register;