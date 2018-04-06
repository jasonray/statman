const assert = require('assert');
const isNull = require('lodash.isnull');

function assertCloseEnough(actual, expected, acceptedVariance) {
    if (isNull(acceptedVariance)) acceptedVariance = 10;
    const lowerThreshold = expected - acceptedVariance;
    const upperThreshold = expected + acceptedVariance;
    const message = "Expected " + expected + " ± " + acceptedVariance + ", was " + actual + ".";
    assert.ok((actual >= lowerThreshold) && (actual <= upperThreshold), message);
}

module.exports.assertCloseEnough = assertCloseEnough;