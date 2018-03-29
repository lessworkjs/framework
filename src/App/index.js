'use strict';

const Macroable = require('macroable');
const path = require('path');

/**
 * App Class
 *
 * @alias App
 * @namespace Lesswork/Src/App
 * @group Core
 *
 * @class App
 */
class App extends Macroable {
  environment() {
    if (arguments.length > 0) {
      const patterns = typeof arguments[0] === 'object' ? arguments[0] : arguments;

      for (let i in patterns) {
        if (patterns[i] === process.env.APP_ENV) {
          return true;
        }
      }

      return false;
    }

    return process.env.APP_ENV;
  }

  getLocale() {
    return this.locale || null;
  }

  isLocale(locale) {
    return this.locale === locale;
  }

  setLocale(locale) {
    this.locale = locale;
  }
}

module.exports = App;