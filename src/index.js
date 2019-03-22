import {
  cloneDeep,
  compact as compactify,
  flattenDeep,
  get,
  first,
  isArray,
  isEmpty,
  isPlainObject,
  map,
  merge as mergify,
  pick,
  omitBy,
  orderBy,
  reduce,
  toLower,
  toUpper,
  uniq as uniqify,
  words as wordify,
} from 'lodash';
import { sync as readPackage } from 'read-pkg';

/**
 * @name RESOURCE_ACTIONS
 * @description default resource actions
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 */
export const RESOURCE_ACTIONS = [
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
 * @function isNoValue
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
 * const isNoValue = isValue('a'); //=> false
 * const isNotValue = isValue(null); //=> true
 */
export const isNotValue = value => !value;

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
 * const notEmpty = areNotEmpty('a', 'b', 'c'); //=> true
 * const notEmpty = areNotEmpty('a', 'b', null); //=> false
 */
export const areNotEmpty = (...values) => {
  // copy values
  const copyOfValues = [...values];
  // check for empty values so far
  const checkForEmpties = (arePreviousEmpty, nextValue) => {
    return arePreviousEmpty && !isEmpty(nextValue);
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
export const compact = value => {
  // copy value
  const copyOfValue = cloneDeep(value);

  // compact array
  if (isArray(copyOfValue)) {
    return compactify(copyOfValue);
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
export const uniq = value => {
  // uniq
  if (value) {
    let copyOfValue = compact(value);
    copyOfValue = isArray(value) ? uniqify(copyOfValue) : copyOfValue;
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
 * const a = [null, 1, 2, "", undefined, 1];
 * const b = sortedUniq(a); // => [ 1, 2 ]
 *
 * const x = {a: 1, b: "", c: undefined};
 * const y = sortedUniq(x); // => { a: 1 }
 */
export const sortedUniq = value => {
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
export const pkg = (...field) => {
  const cwd = process.cwd();
  const copfyOfPkg = readPackage({ cwd });
  const fields = uniq([...field]);
  if (!isEmpty(fields)) {
    return { ...pick(copfyOfPkg, ...fields) };
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
 * const scopes = scopesFor('user')
 * // => ['user:create', 'user:view',...rest]
 */
export const scopesFor = (...resources) => {
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
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.6.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * const abbreaviation = abbreviate('Ministry of Finance')
 * // => MoF
 */
export const abbreviate = (...words) => {
  // ensure words
  let phrases = flattenDeep([...words]);
  phrases = wordify(phrases.join(' '));

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
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.10.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * const id = idOf({ id: 1 }) //=> 1
 * const id = idOf({ _id: 1 }) //=> 1
 */
export const idOf = data => get(data, '_id') || get(data, 'id');

// merge list of objects to single object
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
 * const obj = mergeObjects({ a: 1 }, { b: 1 }, { c: 2}, { c: 2}, {b: null})
 * //=> { a: 1, b: 1, c: 2 }
 */
export const mergeObjects = (...objects) => {
  // ensure source objects
  let sources = compactify([...objects]);
  sources = map(sources, compact);

  // merged objects
  const merged = mergify({}, ...sources);

  // return merged object
  return merged;
};
