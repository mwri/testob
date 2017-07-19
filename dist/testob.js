// Package: testob v0.1.0 (built 2017-07-19 08:02:18)
// Copyright: (C) 2017 Michael Wright <mjw@methodanalysis.com>
// License: MIT


(function () {


'use strict';


let testob_basic = (function () {


	let testob_basic = function testob_basic (params) {

		if (typeof params === 'undefined')
			params = {};

		this.throw_unknown_attribs = params.throw_unknown_attribs ? true : false;
		this.throw_set_undefined   = params.throw_set_undefined   ? true : false;

		this.default_fun = params.default_fun || function () {};

		this.attribs = {};

		if ('attribs' in params) {
			let attrib_names = Object.keys(params.attribs);
			for (let i = 0; i < attrib_names.length; i++)
				this.attribs[attrib_names[i]] = params.attribs[attrib_names[i]];
		}

	};


	testob_basic.prototype.get = function (attrib_name) {

		if (typeof attrib_name === 'undefined')
			throw new Error('attrib name is undefined');

		if (this.throw_unknown_attribs && !(attrib_name in this.attribs))
			throw new Error('attrib "'+attrib_name+'" unknown');

		return this.attribs[attrib_name];

	};

	testob_basic.prototype.set = function (attrib_name, new_val) {

		if (typeof attrib_name === 'undefined')
			throw new Error('attrib name is undefined');

		if (this.throw_set_undefined && typeof new_val === 'undefined')
			throw new Error('new value is undefined');

		if (this.attribs[attrib_name] === new_val)
			return false;

		this.attribs[attrib_name] = new_val;

		return true;

	};


	testob_basic.prototype.getset = function (attrib_name, new_val) {

		if (typeof attrib_name === 'undefined')
			throw new Error('attrib name is undefined');

		if (this.throw_set_undefined && typeof new_val === 'undefined')
			throw new Error('new value is undefined');

		if (this.throw_unknown_attribs && !(attrib_name in this.attribs))
			throw new Error('attrib "'+attrib_name+'" unknown');

		if (new_val !== this.attribs[attrib_name]) {
			this.attribs[attrib_name] = new_val;
			return new_val;
		}

		return this.attribs[attrib_name];

	};


	testob_basic.prototype.return_first_arg = function (arg) {

		return arg;

	};


	testob_basic.prototype.return_args = function () {

		return Array.prototype.slice.call(arguments);

	};


	testob_basic.prototype.return_true = function () {

		return true;

	};


	testob_basic.prototype.return_false = function () {

		return false;

	};


	testob_basic.prototype.return_bool = function () {

		return Math.random() < 0.5;

	};


	testob_basic.prototype.return_int = function () {

		return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

	};


	testob_basic.prototype.return_float = function () {

		return Math.random() * Number.MAX_SAFE_INTEGER / 1000000000;

	};


	testob_basic.prototype.return_fun = function (fun) {

		return fun || this.default_fun;

	};


	return testob_basic;


})();


if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	module.exports = {
		basic: testob_basic,
	};
} else {
	window.testob_basic = testob_basic;
}


}) ();
