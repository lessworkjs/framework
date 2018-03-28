'use strict';
/*
 * adonis-ignitor
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Macroable = require('macroable');
const path = require('path')
const pify = require('pify')
const fs = require('fs');

/**
 * This class returns absolute path to commonly
 * used AdonisJs directories.
 *
 * @namespace Lesswork/Helpers
 * @alias Helpers
 * @singleton
 * @group Core
 *
 * @class Helpers
 * @constructor
 */
class Helpers extends Macroable {
  constructor(appRoot) {
    super()

    this._appRoot = appRoot
  }

  requireByName(hash) {
    hash = hash.split('@');
    const route = hash[0];
    const method = hash[1];

    try {
      return make(use(route))[method]();
    } catch (e) {
      throw new Error(`Unable to load method '${method}' on '${route}'\n${Helpers.appRoot(hash[0])}.js\n${e}`);
    }
  }

  requireIfExists(file) {
    if (!fs.existsSync(file)) {
      return false;
    }

    return require(file);
  }

  /**
   * Returns path to the application root
   *
   * @method appRoot
   *
   * @param  {String}   [toFile = '']
   *
   * @return {String}
   */
  appRoot(toFile = '') {
    return path.join(this._appRoot, toFile)
  }

  /**
   * Returns path to the public directory or a
   * specific file to the public directory.
   *
   * ## Note
   * This method does not check the existence of
   * file.
   *
   * @method publicPath
   *
   * @param  {String}   [toFile = '']
   *
   * @return {String}
   */
  publicPath(toFile = '') {
    return path.join(this._appRoot, '/public', toFile)
  }

  /**
   * Returns path to the config directory.
   *
   * ## Note
   * This method does not check the existence of
   * file.
   *
   * @method configPath
   *
   * @return {String}
   */
  configPath(toFile = '') {
    return path.join(this._appRoot, '/config', toFile)
  }

  /**
   * Returns path to the resources directory or a
   * specific file to the resources directory.
   *
   * ## Note
   * This method does not check the existence of
   * file.
   *
   * @method resourcesPath
   *
   * @param  {String}   [toFile = '']
   *
   * @return {String}
   */
  resourcesPath(toFile = '') {
    return path.join(this._appRoot, '/resources', toFile)
  }

  /**
   * Returns path to the views directory or a
   * specific file to the views directory.
   *
   * ## Note
   * This method does not check the existence of
   * file.
   *
   * @method viewsPath
   *
   * @param  {String}   [toFile = '']
   *
   * @return {String}
   */
  viewsPath(toFile = '') {
    return path.join(this._appRoot, '/resources/views', toFile)
  }

  /**
   * Returns path to the database directory or a
   * specific file to the database directory.
   *
   * ## Note
   * This method does not check the existence of
   * file.
   *
   * @method databasePath
   *
   * @param  {String}   [toFile = '']
   *
   * @return {String}
   */
  databasePath(toFile = '') {
    return path.join(this._appRoot, '/database', toFile)
  }

  /**
   * Returns path to the migrations directory or a
   * specific file to the migrations directory.
   *
   * ## Note
   * This method does not check the existence of
   * file.
   *
   * @method migrationsPath
   *
   * @param  {String}   [toFile = '']
   *
   * @return {String}
   */
  migrationsPath(toFile = '') {
    return path.join(this._appRoot, '/database/migrations', toFile)
  }

  /**
   * Returns path to the seeds directory or a
   * specific file to the seeds directory.
   *
   * ## Note
   * This method does not check the existence of
   * file.
   *
   * @method seedsPath
   *
   * @param  {String}   [toFile = '']
   *
   * @return {String}
   */
  seedsPath(toFile = '') {
    return path.join(this._appRoot, '/database/seeds', toFile)
  }

  /**
   * Returns path to the tmp directory or a
   * specific file to the tmp directory.
   *
   * ## Note
   * This method does not check the existence of
   * file.
   *
   * @method tmpPath
   *
   * @param  {String}   [toFile = '']
   *
   * @return {String}
   */
  tmpPath(toFile = '') {
    return path.join(this._appRoot, '/tmp', toFile)
  }

  /**
   * Promisify callback style functions
   *
   * @method promisify
   *
   * @param  {Function} fn
   * @param  {Object}   options
   *
   * @return {Promise}
   */
  promisify(fn, options) {
    return pify(fn, options)
  }

  /**
   * Tells whether the process has been started by
   * ace command.
   *
   * @method isAceCommand
   *
   * @return {Boolean}
   */
  isAceCommand() {
    const processFile = process.mainModule.filename
    if (processFile.endsWith('ace')) {
      return true
    }

    /**
     * When command is executed via `adonis cli`, then ace is a children
     * of the process mainModule
     */
    return !!process.mainModule.children.find((child) => child.filename.endsWith('ace'))
  }

  /**
   * makes complete namespace for a given path and base
   * namespace
   *
   * @method makeNameSpace
   *
   * @param  {String}      baseNameSpace
   * @param  {String}      toPath
   * @return {String}
   *
   * @public
   */
  makeNameSpace(baseNameSpace, toPath) {
    const appNameSpace = 'App';

    if (toPath.startsWith(`${appNameSpace}/`)) {
      return toPath
    }
    return path.normalize(`${appNameSpace}/${baseNameSpace}/${toPath}`)
  }
}

module.exports = Helpers