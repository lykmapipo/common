# common

[![Build module-starter](https://travis-ci.org/lykmapipo/common.svg?branch=master)](https://travis-ci.org/lykmapipo/common)
[![Dependencies module-starter](https://david-dm.org/lykmapipo/common.svg?style=flat-square)](https://david-dm.org/lykmapipo/common)

Helper utilities for day to day development


## Requirements

- [NodeJS v8.11.1+](https://nodejs.org)
- [npm v5.6.0+](https://www.npmjs.com/)

## Installation

```sh
npm install --save @lykmapipo/common
```

## Usage

```js
const { 
compact,
uniq,
sortedUniq,
pkg,
CONTINENT_NAMES,
COUNTRY_NAMES,
COUNTRY_CODES,
CALLING_CODES,
MAP_FEATURE_GROUPS 
} = require('@lykmapipo/common');

const a = [null, 1, "", undefined];
const b = compact(a); // => [ 1 ]
const x = {a: 1, b: "", c: undefined};
const y = compact(x); // => { a: 1 }

const a = [null, 1, 1, "", undefined, 2];
const b = uniq(a); // => [ 1, 2 ]
const x = {a: 1, b: "", c: undefined};
const y = uniq(x); // => { a: 1 }

const a = [null, 1, 2, "", undefined, 1];
const b = sortedUniq(a); // => [ 1, 2 ]
const x = {a: 1, b: "", c: undefined};
const y = sortedUniq(x); // => { a: 1 }

const { name, description } = pkg(); // => { name: ..., version: ...}

```

## Test

- Clone this repository

- Install all dependencies

```sh
npm install
```

- Then run test

```sh
npm test
```

## Contribute

It will be nice, if you open an issue first so that we can know what is going on, then, fork this repo and push in your ideas. Do not forget to add a bit of test(s) of what value you adding.

## Licence

The MIT License (MIT)

Copyright (c) 2018 lykmapipo & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
