'use strict';


/* dependencies */
const _ = require('lodash');
const { continents, countries } = require('countries-list');
const { sync: readPkg } = require('read-pkg');


/* defaults */
const MAP_FEATURE_DEFAULT_NATURE = 'Other';
const MAP_FEATURE_DEFAULT_FAMILY = 'Other';
const MAP_FEATURE_DEFAULT_TYPE = 'Other';


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


/**
 * @name MAP_FEATURE_NATURES
 * @description provide map feature natures as per OSM primary map
 * features tag key
 * @return {String[]} list of map feature natures
 * @author lally elias <lallyelias87@mail.com>
 * @see {@link https://wiki.openstreetmap.org/wiki/Map_Features}
 * @license MIT
 * @since 0.4.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * const { MAP_FEATURE_NATURES } = require('@lykmapipo/common');
 * // => ['Boundary', ...]
 */
const MAP_FEATURE_NATURES = sortedUniq([
  'Aerialway', 'Aeroway', 'Barrier',
  'Boundary', 'Building', 'Emergency',
  'Highway', 'Man Made', 'Natural',
  'Office', 'Power', 'Public Transport',
  'Railway', 'Route', 'Shop',
  'Telecom', 'Tourism', 'Waterway',
  MAP_FEATURE_DEFAULT_NATURE
]);


/**
 * @name MAP_FEATURE_FAMILIES
 * @description provide map feature family as per OSM primary map
 * features tag value
 * @return {String[]} list of map feature families
 * @author lally elias <lallyelias87@mail.com>
 * @see {@link https://wiki.openstreetmap.org/wiki/Map_Features}
 * @license MIT
 * @since 0.5.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * const { MAP_FEATURE_FAMILIES } = require('@lykmapipo/common');
 * // => ['Administrative', ...]
 */
const MAP_FEATURE_FAMILIES = sortedUniq([
  // 'Aerialway',
  // 'Aeroway',
  // 'Barrier',

  // 'Boundary',
  'Administrative',

  // 'Building',
  'Commercial',
  'Hospital',
  'Industrial',
  'Religious',
  'Residential',
  'School',
  'Stadium',
  'Toilets',
  'Warehouse',

  // 'Emergency',
  'Ambulance Station',
  'Assembly Point',
  'Fire Hydrant',
  'First Aid Kit',
  'Evacuation Centre',

  // 'Highway',
  'Road',
  'Residential',

  // 'Man Made',
  'Bridge',
  'Pipeline',
  'Wastewater Plant',

  // 'Natural',
  'Wetland',

  // 'Office',
  // 'Power',
  'Cable',
  'Generator',
  'Line',
  'Plant',
  'Pole',
  'Transformer',

  // 'Public Transport',
  'Platform',
  'Station',
  'Stop Area',
  'Stop Position',

  // 'Railway',
  'Platform',
  'Rail',
  'Station',

  // 'Route',
  'Evacuation',

  // 'Shop',
  // 'Telecom',
  // 'Tourism',
  // 'Waterway'
  'Ditch',
  'Drain',
  'River',
  'Stream',

  //Other
  MAP_FEATURE_DEFAULT_FAMILY
]);


/**
 * @name MAP_FEATURE_PLACES
 * @description provide map feature human readable places tags
 * features tag value
 * @return {String[]} list of map feature places tags
 * @author lally elias <lallyelias87@mail.com>
 * @see {@link https://wiki.openstreetmap.org/wiki/Map_Features}
 * @license MIT
 * @since 0.5.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * const { MAP_FEATURE_PLACES } = require('@lykmapipo/common');
 * // => ['country', ...]
 */
const MAP_FEATURE_PLACES = sortedUniq([
  'city', 'continent', 'country',
  'county', 'district', 'hamlet',
  'municipality', 'neighbourhood', 'province',
  'region', 'state', 'street',
  'town', 'village', 'ward'
]);


/**
 * @name MAP_FEATURE_TYPES
 * @description provide map feature human readable types
 * features tag value
 * @return {String[]} list of map feature types
 * @author lally elias <lallyelias87@mail.com>
 * @see {@link https://wiki.openstreetmap.org/wiki/Map_Features}
 * @license MIT
 * @since 0.5.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * const { MAP_FEATURE_TYPES } = require('@lykmapipo/common');
 * // => ['Country', ...]
 */
const MAP_FEATURE_TYPES = _.map(sortedUniq(_.flattenDeep([
  // 'Aerialway',
  // 'Aeroway',
  // 'Barrier',
  // 'Boundary',
  MAP_FEATURE_PLACES,
  // 'Building',
  // 'Emergency',
  // 'Highway',
  // 'Man Made',
  // 'Natural',
  // 'Office',
  // 'Power',
  // 'Public Transport',
  // 'Railway',
  // 'Route',
  // 'Shop',
  // 'Telecom',
  // 'Tourism',
  // 'Waterway'
  // Other
  MAP_FEATURE_DEFAULT_TYPE
])), _.startCase);


/* exports */
module.exports = exports = {
  compact,
  uniq,
  sortedUniq,
  pkg,
  CONTINENT_NAMES,
  COUNTRY_NAMES,
  COUNTRY_CODES,
  CALLING_CODES,
  MAP_FEATURE_DEFAULT_NATURE,
  MAP_FEATURE_NATURES,
  MAP_FEATURE_DEFAULT_FAMILY,
  MAP_FEATURE_FAMILIES,
  MAP_FEATURE_PLACES,
  MAP_FEATURE_DEFAULT_TYPE,
  MAP_FEATURE_TYPES
};
