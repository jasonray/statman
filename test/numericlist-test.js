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

    it('given an empty list, sum should return 0', function () {
        var list = new NumericList();
        assert.equal(list.sum(), 0);
    });

    it('given a list of one integer number, sum should return the number')
    it('given a list of two integer numbers, sum should return the sum of the numbers')
    it('given a list of five integer numbers, sum should return the sum of the numbers')

    it('given a list of one decimal number, sum should return the number')
    it('given a list of two decimal numbers, sum should return the sum of the numbers')
    it('given a list of five decimal numbers, sum should return the sum of the numbers')

    it('given an empty list, average should return 0')
    it('given a list of one integer number, average should return the number')
    it('given a list of two integer numbers, sum should return the average of the numbers')
    it('given a list of five integer numbers, sum should return the average of the numbers')

    it('given a list of one decimal number, average should return the number')
    it('given a list of two decimal numbers, sum should return the average of the numbers')
    it('given a list of five decimal numbers, sum should return the average of the numbers')

});
