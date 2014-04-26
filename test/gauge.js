var gaugelib = require('../lib/gauge');

exports.hello = function (test) {
	test.equals(1,1);
	test.done();
};

exports.setgauge = function (test) {
	var mygauge = new gaugelib.gauge();
	test.equals(0, mygauge.getValue());
	mygauge.setValue(5);
	test.equals(5, mygauge.getValue());
	test.done();
};