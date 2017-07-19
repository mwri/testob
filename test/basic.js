(function () {


"use strict";


let testob_basic;
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	let testob  = require('./../dist/testob.js');
	testob_basic = testob.basic;
	require('chai-jasmine');
} else {
	testob_basic = window.testob.basic;
}


let repeats = 50;


describe('test object', function () {

	compat_tests('with no instantiation args', function (params) {
		if (typeof params === 'undefined')
			return new testob_basic();
		return new testob_basic(params);
	});

	compat_tests('with empty instantiation args', function (params) {
		if (typeof params === 'undefined')
			params = {};
		return new testob_basic(params);
	});

	compat_tests('with throw_unknown_attribs=true', function (params) {
		if (typeof params === 'undefined')
			params = {};
		if (!('throw_unknown_attribs' in params))
			params.throw_unknown_attribs = true;
		return new testob_basic(params);
	});

	compat_tests('with throw_set_undefined=true', function (params) {
		if (typeof params === 'undefined')
			params = {};
		if (!('throw_set_undefined' in params))
			params.throw_set_undefined = true;
		return new testob_basic(params);
	});

	compat_tests('with alternative default fun', function (params) {
		if (typeof params === 'undefined')
			params = {};
		if (!('default_fun' in params))
			params.default_fun = function (i, j) { return i / j; };
		return new testob_basic(params);
	});

	function compat_tests(tests_descr, obj_init_cb) {

		describe('instantiates '+tests_descr, function () {

			it('instantiates', function () {
				let o = obj_init_cb();
			});

		});

		function do_many (count, fun) {
			while (count--) fun();
		}

		describe(tests_descr, function () {

			let o;

			beforeEach(function () {
				o = obj_init_cb({ throw_unknown_attribs: false });
			});

			it('returns_true returns true', function () {
				expect(o.return_true()).toBe(true);
			});

			it('returns_false returns false', function () {
				expect(o.return_false()).toBe(false);
			});

			it('returns_bool returns a boolean', function () {
				do_many(repeats, function () {
					expect(typeof o.return_bool()).toBe('boolean');
				});
			});

			it('returns_int returns an integer', function () {
				do_many(repeats, function () {
					let val = o.return_int();
					expect(typeof val).toBe('number');
					expect(Math.floor(val)).toBe(val);
				});
			});

			it('returns_float returns a float', function () {
				do_many(repeats, function () {
					let val = o.return_float();
					expect(typeof val).toBe('number');
					expect(Math.floor(val)).not.toBe(val);
				});
			});

			it('returns_fun returns a function', function () {
				do_many(repeats, function () {
					let val = o.return_fun();
					expect(typeof val).toBe('function');
					val();
				});
			});

			it('returns_args returns the arguments', function () {
				let val = o.return_args();
				expect(typeof val).toBe('object');
				expect(val.constructor).toBe(Array);
				expect(val.length).toBe(0);
				expect(val).toEqual([]);
				val = o.return_args(2);
				expect(typeof val).toBe('object');
				expect(val.constructor).toBe(Array);
				expect(val.length).toBe(1);
				expect(val).toEqual([2]);
				val = o.return_args('dog', 4, false);
				expect(typeof val).toBe('object');
				expect(val.constructor).toBe(Array);
				expect(val.length).toBe(3);
				expect(val).toEqual(['dog', 4, false]);
			});

			it('returns_first_arg returns the first argument', function () {
				let val = o.return_first_arg();
				expect(val).toBe(undefined);
				val = o.return_first_arg(7);
				expect(val).toBe(7);
			});

			it('get with missing attribute name throws exception', function (done) {
				try {
					let val = o.get();
					throw new Error('exception should have been thrown');
				} catch (err) {
					if (/attrib name is undefined/.exec(err))
						done();
					else
						throw err;
				}
			});

			it('set with missing attribute name throws exception', function (done) {
				try {
					let val = o.set();
					throw new Error('exception should have been thrown');
				} catch (err) {
					if (/attrib name is undefined/.exec(err))
						done();
					else
						throw err;
				}
			});

			it('getset with missing attribute name throws exception', function (done) {
				try {
					let val = o.getset();
					throw new Error('exception should have been thrown');
				} catch (err) {
					if (/attrib name is undefined/.exec(err))
						done();
					else
						throw err;
				}
			});

		});

		describe(tests_descr+' throwing exception (throw_unknown_attribs=true)', function () {

			let o;

			beforeEach(function () {
				o = obj_init_cb({ throw_unknown_attribs: true });
			});

			it('for get with missing attribute', function (done) {
				try {
					let val = o.get('foo');
					throw new Error('exception should have been thrown');
				} catch (err) {
					if (/attrib "foo" unknown/.exec(err))
						done();
					else
						throw err;
				}
			});

			it('for get with missing attribute', function (done) {
				try {
					let val = o.getset('foo', 'bleh');
					throw new Error('exception should have been thrown');
				} catch (err) {
					if (/attrib "foo" unknown/.exec(err))
						done();
					else
						throw err;
				}
			});

		});

		describe(tests_descr+' throwing exception (throw_set_undefined=true)', function () {

			let o;

			beforeEach(function () {
				o = obj_init_cb({ throw_set_undefined: true, attribs: { foo: 'foo1' } });
			});

			it('for set with undefined new value', function (done) {
				try {
					let val = o.set('foo');
					throw new Error('exception should have been thrown');
				} catch (err) {
					if (/new value is undefined/.exec(err))
						done();
					else
						throw err;
				}
			});

			it('for getset with undefined new value', function (done) {
				try {
					let val = o.getset('foo');
					throw new Error('exception should have been thrown');
				} catch (err) {
					if (/new value is undefined/.exec(err))
						done();
					else
						throw err;
				}
			});

		});

		describe(tests_descr+' not throwing exception (throw_unknown_attribs=false)', function () {

			let o;

			beforeEach(function () {
				o = obj_init_cb({ throw_unknown_attribs: false });
			});

			it('get with missing attribute returns undefined', function () {
				let val = o.get('foo');
				expect(val).toBe(undefined);
			});

		});

		describe(tests_descr+' with attributes initialised (foo and bar)', function () {

			let o;

			beforeEach(function () {
				o = obj_init_cb({attribs: { foo: 'foo1', bar: 'bar1' }});
			});

			it('get returns value from construction', function () {
				let val = o.get('foo');
				expect(val).toBe('foo1');
			});

			it('set returns false when value does not change', function () {
				expect(o.set('foo', 'foo1')).toBe(false);
			});

			it('set returns alse when value does not change', function () {
				expect(o.set('foo', 'foo2')).toBe(true);
			});

			it('getset returns new value when it changes', function () {
				expect(o.getset('foo', 'foo2')).toBe('foo2');
			});

			it('getset returns new value when it does not change', function () {
				expect(o.getset('foo', 'foo1')).toBe('foo1');
			});

		});

	}

});


})();
