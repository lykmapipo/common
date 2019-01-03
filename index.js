'use strict';


/* dependencies */
const _ = require('lodash');
const { sync: readPkg } = require('read-pkg');


/**
 * @function pkg
 * @name pkg
 * @description read current process package information
 * @return {Object} current process package information
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @private
 * @example
 * const { name, version } = pkg();
 */
exports.pkg = function pkg() {
  const options = _.merge({}, { cwd: process.cwd() });
  const pkg = readPkg(options);
  return pkg;
};
