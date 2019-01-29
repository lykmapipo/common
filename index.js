'use strict';


/* dependencies */
const _ = require('lodash');
const { continents, countries } = require('countries-list');
const { sync: readPkg } = require('read-pkg');


/**
 * @function compact
 * @name compact
 * @description Creates new array(or object) with all falsey values removed.
 * The values false, null, 0, "", undefined, and NaN are falsey.
 * @param {Array|Object} value The array(or object) to compact.
 * @return {Object|Array} new array(or object) of filtered values.
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * const a = [null, 1, "", undefined];
 * const b = compact(a); // => [ 1 ]
 *
 * const x = {a: 1, b: "", c: undefined};
 * const y = compact(x); // => { a: 1 }
 */
const compact = value => {
  // compact array
  if (_.isArray(value)) {
    return _.compact(value);
  }

  //compact object
  if (_.isPlainObject(value)) {
    return _.omitBy(value, function _compat(val) { return !val; });
  }

  // return value
  return value;
};


/**
 * @function uniq
 * @name uniq
 * @description Creates new duplicate-free version of array(or object).
 * @param {Array|Object} value The array(or object) to inspect.
 * @return {Object|Array} new duplicate free array(or object).
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * const a = [null, 1, 1, "", undefined, 2];
 * const b = uniq(a); // => [ 1, 2 ]
 *
 * const x = {a: 1, b: "", c: undefined};
 * const y = uniq(x); // => { a: 1 }
 */
const uniq = value => {
  // uniq
  if (value) {
    let _value = compact(value);
    _value = _.isArray(value) ? _.uniq(_value) : _value;
    return _value;
  }

  // return value
  return value;
};


/**
 * @function sortedUniq
 * @name sortedUniq
 * @description Creates new duplicate-free version of sorted array(or object).
 * @param {Array|Object} value The array(or object) to inspect.
 * @return {Object|Array} new duplicate free sorted array(or object).
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * const a = [null, 1, 2, "", undefined, 1];
 * const b = sortedUniq(a); // => [ 1, 2 ]
 *
 * const x = {a: 1, b: "", c: undefined};
 * const y = sortedUniq(x); // => { a: 1 }
 */
const sortedUniq = value => {
  // sortedUniq
  if (value) {
    let _value = uniq(value);
    _value = _.isArray(_value) ? _.orderBy(_value) : _value;
    return _value;
  }

  // return value
  return value;
};


/**
 * @function pkg
 * @name pkg
 * @description read current process package information
 * @param {String|String[]|...String} field fields to pick from package
 * @return {Object} current process package information
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.2.0
 * @static
 * @public
 * @example
 * const { name, version } = pkg(); // => { name: ..., version: ...}
 */
const pkg = (...field) => {
  const options = _.merge({}, { cwd: process.cwd() });
  const _pkg = readPkg(options);
  const fields = uniq([].concat([...field]));
  if (!_.isEmpty(fields)) {
    return _.merge({}, _.pick(_pkg, ...fields));
  }
  return _pkg;
};


/**
 * @name CONTINENT_NAMES
 * @description provide continent names
 * @return {String[]} list of continent names
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.3.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * const { CONTINENT_NAMES } = require('@lykmapipo/common');
 * // => ['Africa', ...]
 */
const CONTINENT_NAMES = sortedUniq(_.values(continents));


/**
 * @name COUNTRY_NAMES
 * @description provide country names
 * @return {String[]} list of country names
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.3.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * const { COUNTRY_NAMES } = require('@lykmapipo/common');
 * // => ['Tanzania', ...]
 */
const COUNTRY_NAMES = sortedUniq(_.map(countries, 'name'));


/**
 * @name COUNTRY_CODES
 * @description provide country codes
 * @return {String[]} list of country codes
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.3.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * const { COUNTRY_CODES } = require('@lykmapipo/common');
 * // => ['TZ', ...]
 */
const COUNTRY_CODES = _.map(sortedUniq(_.keys(countries)), _.toUpper);


/**
 * @name CALLING_CODES
 * @description provide country calling codes
 * @return {String[]} list of country calling codes
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.3.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * const { CALLING_CODES } = require('@lykmapipo/common');
 * // => ['255', ...]
 */
const CALLING_CODES =
  _.map(sortedUniq(_.flattenDeep(_.map(countries, country => {
    return (country.phone || '').split(',');
  })), _.toUpper));


/* exports */
module.exports = exports = {
  compact,
  uniq,
  sortedUniq,
  pkg,
  CONTINENT_NAMES,
  COUNTRY_NAMES,
  COUNTRY_CODES,
  CALLING_CODES
};
