const Macroable = require('macroable');

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
  environment(...args) {
    if (arguments.length > 0) {
      const patterns = Array.isArray(args[0]) ? args[0] : args;

      return patterns.some(pattern => pattern === process.env.APP_ENV);
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