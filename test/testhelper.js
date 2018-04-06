const assert = require('assert');
const isNull = require('lodash.isnull');

function assertCloseEnough(actual, expected, acceptedVariance) {
    if (isNull(acceptedVariance)) acceptedVariance = 10;
    var lowerThreshold = expected - acceptedVariance;
    var upperThreshold = expected + acceptedVariance;
    var message = "Expected " + expected + " ± " + acceptedVariance + ", was " + actual + ".";
    assert.ok((actual >= lowerThreshold) && (actual <= upperThreshold), message);
}

module.exports.assertCloseEnough = assertCloseEnough;