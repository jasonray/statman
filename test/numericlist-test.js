/*jslint node: true */
"use strict";

var NumericList = require('../lib/NumericList');
var mocha = require('mocha');
var assert = require('assert');

describe('numeric list', function () {
    it('init', function () {
        var list = new NumericList();
        assert.ok(list);
    });


});
