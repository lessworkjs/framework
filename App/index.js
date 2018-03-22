'use strict';

class App {
  registerGlobals() {
    global.app = use('App');

    global.config = use('Config');

    global.Helpers = use('Helpers');

    global.response = use('Response');
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
}

module.exports = App;