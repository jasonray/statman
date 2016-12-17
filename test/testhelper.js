var _ = require('underscore');
var assert = require('assert');


function assertCloseEnough(actual, expected, acceptedVariance) {
    if (_.isEmpty(acceptedVariance)) acceptedVariance = 10;
    var lowerThreshold = expected - acceptedVariance;
    var upperThreshold = expected + acceptedVariance;
    var message = "Expected " + expected + " ± " + acceptedVariance + ", was " + actual + ".";
    assert.ok((actual >= lowerThreshold) && (actual <= upperThreshold), message);
}

module.exports.assertCloseEnough = assertCloseEnough;