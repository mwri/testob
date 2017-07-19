# testob [![Build Status](https://travis-ci.org/mwri/testob.svg?branch=master)](https://travis-ci.org/mwri/testob) [![Coverage Status](https://coveralls.io/repos/github/mwri/testob/badge.svg?branch=master)](https://coveralls.io/github/mwri/testob?branch=master)

A small test object library, lets you instantiate a stateful object
with methods that will return certain values or values conforming to
certain criteria.

## Example

```javascript
let testob_basic = require('testob').basic;

let to = new testob_basic({
    attribs: {
        foo: 'foobar1',
        bar: 'barbaz2',
        baz: 'bazbat3',
        },
    throw_unknown_attribs: true,
    throw_set_undefined:   true,
    });

```

Setting `throw_unknown_attribs` to true (default is false) causes an
exception to be thrown when calling `get` or `getset` on an attribute
that does not exist.

Setting `throw_set_undefined` to true (default is false) causes an
exception to be thrown when calling `set` or `getset` with an `undefined`
new value.

Once instantiated, various methods exist:

```javascript
to.return_first_arg('foobat');      // returns 'foobat'
to.return_args('bazfoo', 4, {});    // returns ['bazfoo', 4, {}]
to.return_true();                   // returns true
to.return_false();                  // returns false
to.return_bool();                   // returns a boolean value
to.return_int();                    // returns an integer value
to.return_float();                  // returns a floating point value
to.return_fun();                    // returns a function
```

## NodeJS and browser usage

Works in node, just require it, like so:

```javascript
let basic_obj = require('testob').basic;
```

Works client side in at least most browsers as well, either
incorporate it with webpack or similar, or just load it, something like
this:

```html
<script src="lib/testob/dist/testob.js"></script>
```

This imports `testob_basic`.

## Dist files

The `dist` folder has the following files available:

File | Description
:-- | :--
testob.js | Limited ES6 features (works with Node.js v4+ and most browsers)
testob_es5.js | ES5 translation (should work with anything)
testob_es5.min.js | Minified ES5 translation

## Build

run `npm install` to install the dev/build dependencies, and
`grunt build` to build.

This will create ES5 `dist/testob.js` and `dist/testob.min.js`
files, and run the unit tests against them.

Running `grunt watch_dev` will invoke an ES6 NodeJS only continuous
file watch build test cycle, and generate coverage reports. Running
`grunt watch_full` will watch for file changes and do a full build.
