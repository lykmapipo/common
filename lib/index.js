const lodash = require('lodash');
const readPkg = require('read-pkg');

/**
 * @name RESOURCE_ACTIONS
 * @description default resource actions
 * @author lally elias <lallyelias87@mail.com>
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
 * @author lally elias <lallyelias87@mail.com>
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
const isNotValue = value => !value;

/**
 * @function areNotEmpty
 * @name areNotEmpty
 * @description Check if provided values are not empty
 * @param {...String} values set of values to check for emptiness
 * @return {Boolean} whether values are not empty
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
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
    return arePreviousEmpty && !lodash.isEmpty(nextValue);
  };
  // assert for emptiness
  const notEmpty = lodash.reduce(copyOfValues, checkForEmpties, true);
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
 * @author lally elias <lallyelias87@mail.com>
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
  const copyOfValue = lodash.cloneDeep(value);

  // compact array
  if (lodash.isArray(copyOfValue)) {
    return lodash.compact(copyOfValue);
  }

  // compact object
  if (lodash.isPlainObject(copyOfValue)) {
    return lodash.omitBy(copyOfValue, isNotValue);
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
 * @author lally elias <lallyelias87@mail.com>
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
    copyOfValue = lodash.isArray(value)
      ? lodash.uniq(copyOfValue)
      : copyOfValue;
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
 * @author lally elias <lallyelias87@mail.com>
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
    copyOfValue = lodash.isArray(copyOfValue)
      ? lodash.orderBy(copyOfValue)
      : copyOfValue;
    return copyOfValue;
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
 *
 * const { name, version } = pkg();
 * // => { name: ..., version: ...}
 */
const pkg = (...field) => {
  const cwd = process.cwd();
  const copfyOfPkg = readPkg.sync({ cwd });
  const fields = uniq([...field]);
  if (!lodash.isEmpty(fields)) {
    return { ...lodash.pick(copfyOfPkg, ...fields) };
  }
  return copfyOfPkg;
};

/**
 * @function scopesFor
 * @name scopesFor
 * @description generate resource scopes(permissions)
 * @param {...String} resources resources
 * @return {Array} resources scopes
 * @author lally elias <lallyelias87@mail.com>
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
      const scope = lodash.toLower([resource, action].join(':'));
      return scope;
    };
    // create scopes(permissions) per action
    return lodash.map(RESOURCE_ACTIONS, toWildcard);
  };

  // generate resources scopes
  if (resources) {
    // copy unique resources
    const copyOfResources = uniq([...resources]);

    // create scopes(permissions) per resource
    scopes = lodash.map(copyOfResources, toActions);
    scopes = sortedUniq(lodash.flattenDeep(scopes));
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
 * @author lally elias <lallyelias87@mail.com>
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
const abbreviate = (...words) => {
  // ensure words
  let phrases = lodash.flattenDeep([...words]);
  phrases = lodash.words(phrases.join(' '));

  // generate abbreviation
  const pickFirstLetters = (abbr, phrase) => {
    return lodash.toUpper(abbr + lodash.first(phrase));
  };
  const abbreviation = lodash.reduce(phrases, pickFirstLetters, '');

  // return abbreviation
  return abbreviation;
};

/**
 * @function idOf
 * @name idOf
 * @description obtain an id or a given object
 * @param {Object} data object to pick id from
 * @return {Mixed} id of a given object
 * @author lally elias <lallyelias87@mail.com>
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
const idOf = data => lodash.get(data, '_id') || lodash.get(data, 'id');

/**
 * @function mergeObjects
 * @name mergeObjects
 * @description merge a list on objects into a single object
 * @param {...Object} objects list of objects
 * @return {Object} a merged object
 * @author lally elias <lallyelias87@mail.com>
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
  let sources = lodash.compact([...objects]);
  sources = lodash.map(sources, compact);

  // merged objects
  const merged = lodash.merge({}, ...sources);

  // return merged object
  return merged;
};

/**
 * @function variableNameFor
 * @name variableNameFor
 * @description produce camelize variable name based on passed strings
 * @param {...String} names list of strings to produce variable name
 * @return {String} camelized variable name
 * @author lally elias <lallyelias87@mail.com>
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
const variableNameFor = (...names) => lodash.camelCase([...names].join(' '));

exports.RESOURCE_ACTIONS = RESOURCE_ACTIONS;
exports.abbreviate = abbreviate;
exports.areNotEmpty = areNotEmpty;
exports.compact = compact;
exports.idOf = idOf;
exports.isNotValue = isNotValue;
exports.mergeObjects = mergeObjects;
exports.pkg = pkg;
exports.scopesFor = scopesFor;
exports.sortedUniq = sortedUniq;
exports.uniq = uniq;
exports.variableNameFor = variableNameFor;