import { resolve } from 'path';
import { readFileSync } from 'fs';
import { arch, cpus, endianness, freemem, homedir, hostname, loadavg, networkInterfaces, platform, release, tmpdir, totalmem, type, uptime } from 'os';
import { isBoolean, flattenDeep, map, reduce, cloneDeep, isArray, compact as compact$1, isPlainObject, omitBy, uniq as uniq$1, orderBy, merge, isEmpty, pick, words, get, camelCase, includes, every, some, forEach, omit, clone, toUpper, toLower, toString, first } from 'lodash';
export { getExtension as mimeExtensionOf, getType as mimeTypeOf } from 'mime';
import { STATUS_CODES } from 'statuses';
import generateColor from 'randomcolor';
import moment from 'moment';
import parseJson from 'parse-json';
import hashObject from 'object-hash';
import renderTemplate from 'string-template';
import stripTags from 'striptags';

/**
 * @name RESOURCE_ACTIONS
 * @description default resource actions
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @private
 */
const RESOURCE_ACTIONS = [
  'create',
  'view',
  'edit',
  'delete',
  'share',
  'print',
  'import',
  'export',
  'download',
];

/**
 * @function isNotValue
 * @name isNotValue
 * @description Check if variable has no associated state
 * @param {Mixed} value variable to check if it has no associated state
 * @return {Boolean} whether variable contain state
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.9.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const isNotValue = isValue('a');
 * //=> false
 *
 * const isNotValue = isValue(null);
 * //=> true
 */
const isNotValue = value => (isBoolean(value) ? false : !value);

/**
 * @function mapToUpper
 * @name mapToUpper
 * @description convert list of values to upper values
 * @param {String[]|...String} values list to convert to upper
 * @return {String[]} list of upper values
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.12.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const mapToUpper = mapToUpper('a');
 * //=> ['A']
 *
 * const mapToUpper = mapToUpper(['a', 'b'], 'c');
 * //=> ['A', 'B', 'C']
 */
const mapToUpper = (...values) => {
  // convert lower to upper
  const convertToUpper = value => toUpper(value);
  // collect values
  const lowerValues = flattenDeep([...values]);
  // convert to upper
  const upperValues = map(lowerValues, convertToUpper);
  // return upper values
  return upperValues;
};

/**
 * @function mapToLower
 * @name mapToLower
 * @description convert list of values to lower values
 * @param {String[]|...String} values list to convert to lower
 * @return {String[]} list of lower values
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.12.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const mapToLower = mapToLower('A');
 * //=> ['a']
 *
 * const mapToLower = mapToLower(['A', 'B'], 'C');
 * //=> ['a', 'b', 'c']
 */
const mapToLower = (...values) => {
  // convert upper to lower
  const convertToLower = value => toLower(value);
  // collect values
  const upperValues = flattenDeep([...values]);
  // convert to lower
  const lowerValues = map(upperValues, convertToLower);
  // return lower values
  return lowerValues;
};

/**
 * @function areNotEmpty
 * @name areNotEmpty
 * @description Check if provided values are not empty
 * @param {...String} values set of values to check for emptiness
 * @return {Boolean} whether values are not empty
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.2.0
 * @static
 * @public
 * @example
 *
 * const notEmpty = areNotEmpty('a', 'b', 'c');
 * //=> true
 *
 * const notEmpty = areNotEmpty('a', 'b', null);
 * //=> false
 */
const areNotEmpty = (...values) => {
  // copy values
  const copyOfValues = [...values];
  // check for empty values so far
  const checkForEmpties = (arePreviousEmpty, nextValue) => {
    return arePreviousEmpty && !isEmpty(toString(nextValue));
  };
  // assert for emptiness
  const notEmpty = reduce(copyOfValues, checkForEmpties, true);
  // return emptiness state
  return notEmpty;
};

/**
 * @function compact
 * @name compact
 * @description Creates new array(or object) with all falsey values removed.
 * The values false, null, 0, "", undefined, and NaN are falsey.
 * @param {Array|Object} value The array(or object) to compact.
 * @return {Object|Array} new array(or object) of filtered values.
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const b = compact([null, 1, "", undefined]);
 * // => [ 1 ]
 *
 * const y = compact({a: 1, b: "", c: undefined});
 * // => { a: 1 }
 */
const compact = value => {
  // copy value
  const copyOfValue = cloneDeep(value);

  // compact array
  if (isArray(copyOfValue)) {
    return compact$1(copyOfValue);
  }

  // compact object
  if (isPlainObject(copyOfValue)) {
    return omitBy(copyOfValue, isNotValue);
  }

  // return value
  return copyOfValue;
};

/**
 * @function uniq
 * @name uniq
 * @description Creates new duplicate-free version of array(or object).
 * @param {Array|Object} value The array(or object) to inspect.
 * @return {Object|Array} new duplicate free array(or object).
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const b = uniq([null, 1, 1, "", undefined, 2]);
 * // => [ 1, 2 ]
 *
 * const y = uniq({a: 1, b: "", c: undefined});
 * // => { a: 1 }
 */
const uniq = value => {
  // uniq
  if (value) {
    let copyOfValue = compact(value);
    copyOfValue = isArray(value) ? uniq$1(copyOfValue) : copyOfValue;
    return copyOfValue;
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
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const b = sortedUniq([null, 1, 2, "", undefined, 1]);
 * // => [ 1, 2 ]
 *
 * const y = sortedUniq({a: 1, b: "", c: undefined});
 * // => { a: 1 }
 */
const sortedUniq = value => {
  // sortedUniq
  if (value) {
    let copyOfValue = uniq(value);
    copyOfValue = isArray(copyOfValue) ? orderBy(copyOfValue) : copyOfValue;
    return copyOfValue;
  }

  // return value
  return value;
};

/**
 * @function mergeObjects
 * @name mergeObjects
 * @description merge a list on objects into a single object
 * @param {...Object} objects list of objects
 * @return {Object} a merged object
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.10.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const obj = mergeObjects({ a: 1 }, { b: 1 }, { c: 2}, { c: 2}, {b: null})
 * //=> { a: 1, b: 1, c: 2 }
 */
const mergeObjects = (...objects) => {
  // ensure source objects
  let sources = compact$1([...objects]);
  sources = map(sources, compact);

  // merged objects
  const merged = merge({}, ...sources);

  // return merged object
  return merged;
};

/**
 * @function pkg
 * @name pkg
 * @description read package information
 * @param {String} [path] valid path to package.json file
 * @param {String|String[]|...String} field fields to pick from package
 * @return {Object} current process package information
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.3.0
 * @static
 * @public
 * @example
 *
 * const { name, version } = pkg();
 * // => { name: ..., version: ...}
 *
 * const { name, version } = pkg(__dirname);
 * // => { name: ..., version: ...}
 */
const pkg = (path, ...field) => {
  // try read from path or process cwd
  const read = () => {
    try {
      const filePath = resolve(path, 'package.json');
      const json = parseJson(readFileSync(filePath, 'utf8'));
      return json;
    } catch (e) {
      const filePath = resolve(process.cwd(), 'package.json');
      const json = parseJson(readFileSync(filePath, 'utf8'));
      return json;
    }
  };

  // try read package data
  try {
    const packageInfo = mergeObjects(read());
    const fields = uniq([...field, path]);
    if (!isEmpty(fields)) {
      const info = { ...pick(packageInfo, ...fields) };
      return isEmpty(info) ? { ...packageInfo } : info;
    }
    return packageInfo;
  } catch (e) {
    // no package data found
    return {};
  }
};

/**
 * @function scopesFor
 * @name scopesFor
 * @description generate resource scopes(permissions)
 * @param {...String} resources resources
 * @return {Array} resources scopes
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.6.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const scopes = scopesFor('user')
 * // => ['user:create', 'user:view']
 */
const scopesFor = (...resources) => {
  // initialize resources scopes
  let scopes;

  // map resource to actions
  const toActions = resource => {
    // map action to wildcard scopes
    const toWildcard = action => {
      // map action to scope(permission)
      const scope = toLower([resource, action].join(':'));
      return scope;
    };
    // create scopes(permissions) per action
    return map(RESOURCE_ACTIONS, toWildcard);
  };

  // generate resources scopes
  if (resources) {
    // copy unique resources
    const copyOfResources = uniq([...resources]);

    // create scopes(permissions) per resource
    scopes = map(copyOfResources, toActions);
    scopes = sortedUniq(flattenDeep(scopes));
  }

  // return resources scopes
  return scopes;
};

/**
 * @function abbreviate
 * @name abbreviate
 * @description generate shortened form of word(s) or phrase.
 * @param {...String} words set of words to derive abbreaviation
 * @return {String} abbreviation
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.6.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const abbreaviation = abbreviate('Ministry of Finance')
 * // => MoF
 */
const abbreviate = (...words$1) => {
  // ensure words
  let phrases = flattenDeep([...words$1]);
  phrases = words(phrases.join(' '));

  // generate abbreviation
  const pickFirstLetters = (abbr, phrase) => {
    return toUpper(abbr + first(phrase));
  };
  const abbreviation = reduce(phrases, pickFirstLetters, '');

  // return abbreviation
  return abbreviation;
};

/**
 * @function idOf
 * @name idOf
 * @description obtain an id or a given object
 * @param {Object} data object to pick id from
 * @return {Mixed} id of a given object
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.10.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const id = idOf({ id: 1 })
 * //=> 1
 *
 * const id = idOf({ _id: 1 })
 * //=> 1
 */
const idOf = data => get(data, '_id') || get(data, 'id');

/**
 * @function variableNameFor
 * @name variableNameFor
 * @description produce camelize variable name based on passed strings
 * @param {...String} names list of strings to produce variable name
 * @return {String} camelized variable name
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.10.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const name = variableNameFor('get', 'name');
 * //=> getName
 *
 * const name = variableNameFor('pick', 'a', 'name');
 * //=> pickAName
 */
const variableNameFor = (...names) => camelCase([...names].join(' '));

/**
 * @function has
 * @name has
 * @description check if value is in a collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @param {Mixed} value The value to search for.
 * @returns {Boolean} whether value is in collection
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.11.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const hasValue = has([ 1, 2 ], 1);
 * //=> true
 *
 * const hasValue = has([ 'a', 'b' ], 'c');
 * //=> false
 */
const has = (collection, value) => includes(collection, value);

/**
 * @function hasAll
 * @name hasAll
 * @description check if all value are in a collection
 * @param {Array} collection The collection to inspect.
 * @param {Array|...Mixed} values The values to search for.
 * @returns {Boolean} whether values are in collection
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.11.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const hasValues = hasAll([ 1, 2 ], 1, 2);
 * //=> true
 *
 * const hasValues = hasAll([ 1, 2 ], [ 1, 2 ]);
 * //=> true
 *
 * const hasValues = hasAll([ 'a', 'b' ], 'c', 'd');
 * //=> false
 */
const hasAll = (collection, ...values) => {
  // check if value is in collection
  const checkIfIsInCollection = value => has(collection, value);

  // check if collection has all values
  const flatValues = flattenDeep([...values]);
  const areAllInCollection = every(flatValues, checkIfIsInCollection);

  // return whether collection has all value
  return areAllInCollection;
};

/**
 * @function hasAny
 * @name hasAny
 * @description check if any value is in a collection
 * @param {Array} collection The collection to inspect.
 * @param {Array|...Mixed} values The values to search for.
 * @returns {Boolean} whether any value is in collection
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.11.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const hasValues = hasAny([ 1, 2 ], 1, 2);
 * //=> true
 *
 * const hasValues = hasAny([ 1, 2 ], [ 1, 2 ]);
 * //=> true
 *
 * const hasValues = hasAny([ 'a', 'b' ], 'b', 'd');
 * //=> true
 *
 * const hasValues = hasAny([ 'a', 'b' ], 'c', 'd');
 * //=> false
 */
const hasAny = (collection, ...values) => {
  // check if value is in collection
  const checkIfIsInCollection = value => has(collection, value);

  // check if collection has all values
  const flatValues = flattenDeep([...values]);
  const isAnyInCollection = some(flatValues, checkIfIsInCollection);

  // return whether collection has any value
  return isAnyInCollection;
};

/**
 * @function bagify
 * @name bagify
 * @description normalize errors bag to light weight object
 * @param {Object} errors valid errors bag
 * @return {Object} formatted errors bag
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.14.0
 * @version 0.2.0
 * @static
 * @public
 * @example
 *
 * const body = bagify({name : new Error('Validation Error') });
 * //=> { name: { name: 'Error', message: 'Name Required'}, ... }
 *
 */
const bagify = (errors = {}) => {
  // initialize normalize errors bag
  const bag = {};
  // iterate errors ba
  forEach(errors, (error = {}, key) => {
    // simplify error bag
    const {
      message,
      name,
      type,
      kind,
      path,
      value,
      index,
      properties = {},
    } = error;
    const normalized = mergeObjects(
      { message, name, type, kind, path, value, index },
      properties
    );
    // reset key with normalized error
    const props = ['message', 'name', 'type', 'kind', 'path', 'value', 'index'];
    bag[key] = pick(normalized, ...props);
  });
  // return errors bag
  return bag;
};

/**
 * @function mapErrorToObject
 * @name mapErrorToObject
 * @description convert error instance to light weight object
 * @param {Error} error valid error instance
 * @param {Object} [options] additional convert options
 * @param {String} [options.name=Error] default error name
 * @param {String} [options.code=500] default error code
 * @param {String} [options.stack=false] where to include error stack
 * @see {@link https://jsonapi.org/format/#errors}
 * @return {Object} formatted error object
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.13.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const body = mapErrorToObject(new Error('Missing API Key'));
 * //=> { name:'Error', message: 'Missing API Key', ... }
 *
 */
const mapErrorToObject = (error, options = {}) => {
  // ensure options
  const {
    name = 'Error',
    code = 500,
    stack = false,
    status,
    message,
    description,
  } = mergeObjects(options);

  // prepare error payload
  const body = {};
  body.code = error.code || code;
  body.status = error.status || status || code;
  body.name = error.name || name;
  body.message = error.message || message || STATUS_CODES[code];
  body.description = error.description || description || body.message;
  body.errors = error.errors ? bagify(error.errors) : undefined;
  body.stack = stack ? error.stack : undefined;

  // support OAuth v2 error style
  // https://tools.ietf.org/html/rfc6749#page-71
  body.uri = get(error, 'error_uri', error.uri);
  body.error = error.error || body.name;
  body.error_description = body.description;
  body.error_uri = body.uri;

  // return formatted error response
  return mergeObjects(body);
};

/**
 * @function osInfo
 * @name osInfo
 * @description obtain operating system information
 * @return {Object} os information object
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.14.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const info = osInfo();
 * //=> { arch:'x64', ... }
 *
 */
const osInfo = () => {
  // collect os information
  const info = {
    arch: arch(),
    cpus: cpus(),
    endianness: endianness(),
    freemem: freemem(),
    homedir: homedir(),
    hostname: hostname(),
    loadavg: loadavg(),
    networkInterfaces: networkInterfaces(),
    platform: platform(),
    release: release(),
    tmpdir: tmpdir(),
    totalmem: totalmem(),
    type: type(),
    uptime: uptime(),
  };
  // return collected os information
  return info;
};

/**
 * @function processInfo
 * @name processInfo
 * @description obtain current process information
 * @return {Object} current process information
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.15.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const info = processInfo();
 * //=> { pid: 8989, ... }
 *
 */
const processInfo = () => {
  // collect process information
  const info = {
    arch: process.arch,
    cpuUsage: process.cpuUsage(),
    cwd: process.cwd(),
    features: process.features,
    egid: process.getegid(),
    euid: process.geteuid(),
    gid: process.getgid(),
    groups: process.getgroups(),
    uid: process.getuid(),
    hrtime: process.hrtime(),
    memoryUsage: process.memoryUsage(),
    pid: process.pid,
    platform: process.platform,
    ppid: process.ppid,
    title: process.title,
    uptime: process.uptime(),
    version: process.version,
    versions: process.versions,
  };
  // return collected process information
  return info;
};

/**
 * @function randomColor
 * @name randomColor
 * @description generating attractive random colors
 * @param {Object} [optns] valid generator options
 * @param {String} [optns.luminosity=light] controls the luminosity of the
 * generated color. you can specify a string containing `bright`, `light` or
 * `dark`.
 * @return {String} random color
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.18.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const color = randomColor();
 * //=> #C349D8
 *
 */
const randomColor = (optns = { luminosity: 'light' }) => {
  const options = mergeObjects(optns);
  const color = generateColor(options);
  return color;
};

/**
 * @function formatDate
 * @name formatDate
 * @description format a data using specified format
 * @param {Date} [date=new Date()] valid date instance
 * @param {String} [format='YYYY-MM-DD'] valid date format
 * @return {String} formatted date string
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.19.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const date = formatDate(new Date(), 'YYYY-MM-DD');
 * //=> 2019-05-30
 *
 */
const formatDate = (date = new Date(), format = 'YYYY-MM-DD') => {
  const formatted = moment(date).format(format);
  return formatted;
};

/**
 * @function hashOf
 * @name hashOf
 * @description Generate hash of provided object
 * @param {Object} object valid object to hash
 * @param {...String} [ignore] properties to ignore
 * @return {String} valid object hash
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.21.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const hash = hashOf({ foo: 'bar' })
 * // => '67b69634f9880a282c14a0f0cb7ba20cf5d677e9'
 *
 */
const hashOf = (object, ...ignore) => {
  // ensure object
  let copyOfObject = mergeObjects(object);
  copyOfObject = omit(copyOfObject, ...ignore);

  // compute hash
  const hash = hashObject(copyOfObject);

  // return computed hash
  return hash;
};

/**
 * @function parseTemplate
 * @name parseTemplate
 * @description Parse, format and render string based template
 * @param {String} template valid template
 * @param {Object} data object valid object apply on template
 * @return {String} formatted string
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.21.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const template = 'Hello {name}, you have {count} unread messages';
 * const formatted = parseTemplate(template, { name: 'John', count: 12 });
 * //=> 'Hello John, you have 12 unread messages'
 *
 */
const parseTemplate = (template, data) => {
  // ensure copy
  const copyOfTemplate = clone(template);
  const copyOfData = mergeObjects(data);

  // render string template
  const formatted = renderTemplate(copyOfTemplate, copyOfData);

  // return formatted string
  return formatted;
};

/**
 * @function stripHtmlTags
 * @name stripHtmlTags
 * @description Strip HTML tags from a string
 * @param {String} html valid html string
 * @return {String} string with no html tags
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.21.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const html = 'lorem ipsum <strong>dolor</strong> <em>sit</em> amet';
 * const formatted = stripHtmlTags(html);
 * //=> 'lorem ipsum dolor sit amet'
 *
 */
const stripHtmlTags = html => {
  const copyOfHtml = clone(html);
  const formatted = stripTags(copyOfHtml);
  return formatted;
};

export { RESOURCE_ACTIONS, abbreviate, areNotEmpty, bagify, compact, formatDate, has, hasAll, hasAny, hashOf, idOf, isNotValue, mapErrorToObject, mapToLower, mapToUpper, mergeObjects, osInfo, parseTemplate, pkg, processInfo, randomColor, scopesFor, sortedUniq, stripHtmlTags, uniq, variableNameFor };
