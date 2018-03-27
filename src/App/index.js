'use strict';

const Macroable = require('macroable');
const path = require('path');

/**
 * App Class
 *
 * @alias App
 * @binding Lesswork/App
 * @group Core
 *
 * @class App
 */
class App extends Macroable {
  constructor() {
    super();
  }

  registerGlobals() {
    global.App = use('App');
    global.Helpers = use('Helpers');
    global.Config = use('Config');
    global.Response = use('Response');
    global.Request = use('Request');
    global.State = use('State');
    global.EXP = use('Exception');
    global.Route = use('Route');

    this.registerLintl();

    use('Event').fire('app:registerGlobals');
  }

  registerLintl() {
    const Lintl = use('Lintl');

    global.numberFormat = Lintl.numberFormat;
    global.dateFormat = Lintl.dateFormat;
    global.__ = Lintl.translate;
    global.lang = global.__;

    this.setLocale(Config.get('app.locale'));
  }

  run(callback) {
    if (typeof callback === 'string') {
      callback = Helpers.requireByName(callback);
    }

    return require('co')(callback).catch(error => {
      require('../../lib/error')(error);
    });
  }

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
    return this.locale;
  }

  isLocale(locale) {
    return this.locale === locale;
  }

  setLocale(locale) {
    this.locale = locale;
  }
}

module.exports = App;