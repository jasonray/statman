var _metrics = [];

exports.register = function(metricname, metric) {
	var metricentry = {};
	metricentry.name = metricname;
	metricentry.metric = metric;
};

exports.list = function() {
	return _metrics;
};
