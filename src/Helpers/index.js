/*
 * adonis-ignitor
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const SinkHelpers = require('@adonisjs/sink/src/Helpers');
const fs = require('fs');
const path = require('path');

/**
 * This class returns absolute path to commonly
 * used AdonisJs directories.
 *
 * @namespace Lesswork/Src/Helpers
 * @alias Helpers
 * @singleton
 * @group Core
 *
 * @class Helpers
 * @constructor
 */
class Helpers extends SinkHelpers {
  requireByName(hash) {
    hash = hash.split('@');
    const route = hash[0];
    const method = hash[1];

    try {
      return make(use(route))[method]();
    } catch (e) {
      throw new Error(`Unable to load method '${method}' on '${route}'\n${this.appRoot(hash[0])}.js  ${e}`);
    }
  }

  requireIfExists(file) {
    if (!fs.existsSync(file)) {
      return false;
    }

    return require(file);
  }

  /**
   * Tells whether the process has been started by
   * ace command.
   *
   * @method isWorkCommand
   *
   * @return {Boolean}
   */
  isWorkCommand() {
    const processFile = process.mainModule.filename;

    if (processFile.endsWith('work')) {
      return true;
    }

    /**
     * When command is executed via `adonis cli`, then ace is a children
     * of the process mainModule
     */
    return !!process.mainModule.children.find(child => child.filename.endsWith('work'));
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
    return path.join(this._appRoot, toFile);
  }
}

module.exports = Helpers;