(function () {


"use strict";


let testob_basic;
let testob_return_true;
let testob_return_false;
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	let testob  = require('./../dist/testob.js');
	testob_basic = testob.basic;
	testob_return_true = testob.return_true;
	testob_return_false = testob.return_false;
	require('chai-jasmine');
} else {
	testob_basic = window.testob.basic;
	testob_return_true = window.testob.return_true;
	testob_return_false = window.testob.return_false;
}


describe('exported function', function () {

	it('works', function () {
		expect(testob_return_true()).toBe(true);
		expect(testob_return_false()).toBe(false);
	});

});


})();
