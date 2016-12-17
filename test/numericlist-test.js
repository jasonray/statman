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

    it('given an empty list, size should return 0', function () {
        var list = new NumericList();
        assert.equal(list.size(), 0);
    });

    it('given a list of one, size should return 1', function () {
        var list = new NumericList();
        list.push(0);
        assert.equal(list.size(), 1);
    });

    it('given a list of five, size should return 5', function () {
        var list = new NumericList();
        list.push(0);
        list.push(0);
        list.push(0);
        list.push(0);
        list.push(0);
        assertCloseEnough(list.size(), 5);
    });

    it('given an empty list, sum should return 0', function () {
        var list = new NumericList();
        assertCloseEnough(list.sum(), 0);
    });

    it('given a list of one integer number, sum should return the number', function () {
        var list = new NumericList();
        list.push(5);
        assertCloseEnough(list.sum(), 5);
    });

    it('given a list of two integer numbers, sum should return the sum of the numbers', function () {
        var list = new NumericList();
        list.push(2);
        list.push(4);
        assertCloseEnough(list.sum(), 6);
    });

    it('given a list of five integer numbers, sum should return the sum of the numbers', function () {
        var list = new NumericList();
        list.push(1);
        list.push(2);
        list.push(3);
        list.push(4);
        list.push(5);
        assertCloseEnough(list.sum(), 15);
    });

    it('given a list of one decimal number, sum should return the number', function () {
        var list = new NumericList();
        list.push(5.5);
        assertCloseEnough(list.sum(), 5.5);
    });

    it('given a list of two decimal numbers, sum should return the sum of the numbers', function () {
        var list = new NumericList();
        list.push(2.2);
        list.push(4.4);
        assertCloseEnough(list.sum(), 6.6)
    });

    it('given a list of five decimal numbers, sum should return the sum of the numbers', function () {
        var list = new NumericList();
        list.push(1.1);
        list.push(2.2);
        list.push(3.3);
        list.push(4.4);
        list.push(5.5);
        assertCloseEnough(list.sum(), 16.5);
    });

    it('given an empty list, average should return 0', function () {
        var list = new NumericList();
        assertCloseEnough(list.average(), 0);
    });

    it('given a list of one integer number, average should return the number', function () {
        var list = new NumericList();
        list.push(5);
        assertCloseEnough(list.average(), 5);
    });

    it('given a list of two integer numbers, sum should return the average of the numbers', function () {
        var list = new NumericList();
        list.push(4);
        list.push(6);
        assertCloseEnough(list.average(), 5);
    });

    it('given a list of five integer numbers, sum should return the average of the numbers', function () {
        var list = new NumericList();
        list.push(1);
        list.push(2);
        list.push(3);
        list.push(4);
        list.push(5);
        assertCloseEnough(list.average(), 3);
    });

    it('given a list of one decimal number, average should return the number', function () {
        var list = new NumericList();
        list.push(3.3);
        assertCloseEnough(list.average(), 3.3)
    });

    it('given a list of two decimal numbers, sum should return the average of the numbers', function () {
        var list = new NumericList();
        list.push(2.2);
        list.push(4.4);
        assertCloseEnough(list.average(), 3.3)
    });

    it('given a list of five decimal numbers, sum should return the average of the numbers', function () {
        var list = new NumericList();
        list.push(1.1);
        list.push(2.2);
        list.push(3.3);
        list.push(4.4);
        list.push(5.5);
        assertCloseEnough(list.average(), 3.3)
    });

    it('pushing a list of 100,000 numbers and calculating sum/ave should run within milliseconds', function () {
        this.timeout(1000);

        var testsize = 100000;
        var list = new NumericList();

        for (var i = 1; i <= testsize; i++) {
            list.push(i);
        }

        function getExpected(n) {
            return {
                size: n,
                average: (1 + n) / 2,
                sum: n * (1 + n) / 2
            }
        }

        var expected = getExpected(testsize);

        assertCloseEnough(list.size(), expected.size, "size");
        assertCloseEnough(list.sum(), expected.sum, "sum");
        assertCloseEnough(list.average(), expected.average, "ave");
    });

    function assertCloseEnough(actual, expected) {
        assert.equal(actual.toFixed(2), expected.toFixed(2));
    }

});
