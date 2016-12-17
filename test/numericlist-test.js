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

    it('given a list of one integer number, sum should return the number', function () {
        var list = new NumericList();
        list.push(5);
        assert.equal(list.sum(), 5);
    });

    it('given a list of two integer numbers, sum should return the sum of the numbers', function () {
        var list = new NumericList();
        list.push(2);
        list.push(4);
        assert.equal(list.sum(), 6);
    });

    it('given a list of five integer numbers, sum should return the sum of the numbers', function () {
        var list = new NumericList();
        list.push(1);
        list.push(2);
        list.push(3);
        list.push(4);
        list.push(5);
        assert.equal(list.sum(), 15);
    });

    it('given a list of one decimal number, sum should return the number', function () {
        var list = new NumericList();
        list.push(5.5);
        assert.equal(list.sum(), 5.5);
    });

    it('given a list of two decimal numbers, sum should return the sum of the numbers', function () {
        var list = new NumericList();
        list.push(2.2);
        list.push(4.4);
        assert.equal(list.sum(), 6.6);
    });

    it('given a list of five decimal numbers, sum should return the sum of the numbers')

    it('given an empty list, average should return 0')
    it('given a list of one integer number, average should return the number')
    it('given a list of two integer numbers, sum should return the average of the numbers')
    it('given a list of five integer numbers, sum should return the average of the numbers')

    it('given a list of one decimal number, average should return the number')
    it('given a list of two decimal numbers, sum should return the average of the numbers')
    it('given a list of five decimal numbers, sum should return the average of the numbers')

});
