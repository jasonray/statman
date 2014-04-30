var metrics = require('../lib/metrics');

exports.metricCollectionFilter = function(req, res, next) {
	var totalCallsMetricName = 'http.total';
	var currentCallsMetricsName = 'http.current';
	var peakCallsMetricsName = 'http.peak';
	var urlTotalCallsMetricName = 'http.' + req.url + '.total';
	var urlCurrentCallsMetricName = 'http.' + req.url + '.current';
	var urlPeakCallsMetricName = 'http.' + req.url + '.peak';

	metrics.gauges(totalCallsMetricName).increment();
	metrics.gauges(currentCallsMetricsName).increment();
	metrics.gauges(peakCallsMetricsName).set(Math.max(metrics.gauges(peakCallsMetricsName).value(), metrics.gauges(currentCallsMetricsName).value()));

	metrics.gauges(urlTotalCallsMetricName).increment();
	metrics.gauges(urlCurrentCallsMetricName).increment();
	metrics.gauges(urlPeakCallsMetricName).set(Math.max(metrics.gauges(urlPeakCallsMetricName).value(), metrics.gauges(urlCurrentCallsMetricName).value()));

	function onEndCall() {
		res.removeListener('finish', onEndCall);
		res.removeListener('close', onEndCall);
		metrics.gauges(currentCallsMetricsName).decrement();
		metrics.gauges(urlCurrentCallsMetricName).decrement();
	}

	res.on('finish', onEndCall);
	res.on('close', onEndCall);

	next();
};

exports.metricOutputResource = function(req, res, next) {
	var output = {};
	var m = metrics.registry();
	for (var i = 0; i < m.length; i++) {
		var met = m[i];
		output[met.name()] = met.value();
	}
	res.end(JSON.stringify(output));
};