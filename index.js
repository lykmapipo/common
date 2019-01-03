'use strict';


/* dependencies */
const _ = require('lodash');
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
exports.compact = function compact(value) {
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
exports.uniq = function uniq(value) {
  // uniq
  if (value) {
    let _value = exports.compact(value);
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
exports.sortedUniq = function sortedUniq(value) {
  // sortedUniq
  if (value) {
    let _value = exports.uniq(value);
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
exports.pkg = function pkg(...field) {
  const options = _.merge({}, { cwd: process.cwd() });
  const _pkg = readPkg(options);
  const fields = exports.uniq([].concat([...field]));
  if (!_.isEmpty(fields)) {
    return _.merge({}, _.pick(_pkg, ...fields));
  }
  return _pkg;
};
