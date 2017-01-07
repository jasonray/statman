// var metrics = require('statman');
// var _ = require('underscore');
//
// exports.metricCollectionFilter = function(req, res, next) {
// 	var totalCallsMetricName = 'http.total';
// 	var currentCallsMetricsName = 'http.current';
// 	var peakCallsMetricsName = 'http.peak';
// 	var urlTotalCallsMetricName = 'http.' + req.path + '.total';
// 	var urlCurrentCallsMetricName = 'http.' + req.path + '.current';
// 	var urlPeakCallsMetricName = 'http.' + req.path + '.peak';
//
// 	metrics.gauges(totalCallsMetricName).increment();
// 	metrics.gauges(currentCallsMetricsName).increment();
// 	metrics.gauges(peakCallsMetricsName).set(Math.max(metrics.gauges(peakCallsMetricsName).value(), metrics.gauges(currentCallsMetricsName).value()));
//
// 	metrics.gauges(urlTotalCallsMetricName).increment();
// 	metrics.gauges(urlCurrentCallsMetricName).increment();
// 	metrics.gauges(urlPeakCallsMetricName).set(Math.max(metrics.gauges(urlPeakCallsMetricName).value(), metrics.gauges(urlCurrentCallsMetricName).value()));
//
// 	function onEndCall() {
// 		res.removeListener('finish', onEndCall);
// 		res.removeListener('close', onEndCall);
// 		metrics.gauges(currentCallsMetricsName).decrement();
// 		metrics.gauges(urlCurrentCallsMetricName).decrement();
// 		metrics.gauges('http.status.' + res.statusCode + '.count').increment();
// 		metrics.gauges('http.' + req.path + '.status.' + res.statusCode + '.count').increment();
// 	}
//
// 	res.on('finish', onEndCall);
// 	res.on('close', onEndCall);
//
// 	next();
// };
//
// exports.metricOutputResource = function(req, res, next) {
// 	res.format({
// 		json: function() {
// 			var output = {};
// 			var m = metrics.registry();
// 			for (var i = 0; i < m.length; i++) {
// 				var met = m[i];
// 				output[met.name()] = met.value();
// 			}
// 			res.type('json').end(JSON.stringify(output));
// 		},
// 		html: function() {
// 			res.type('text/html').end(convertMetricsToHtml());
// 		},
// 		text: function() {
// 			res.type('text/plain').end('plain text, yo');
// 		}
// 	});
// };
//
// function convertMetricsToHtml() {
// 	var html = "<html><body><table border='1'>";
// 	_.each(metrics.registry(), function(singlemetric) {
// 		var row = "<tr><td>" + singlemetric.name() + "</td><td>" + singlemetric.value() + "</td></tr>";
// 		html = html + row;
// 	});
// 	html = html + "</table></body></html>";
// 	return html;
// }