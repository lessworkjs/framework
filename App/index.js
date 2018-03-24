'use strict';

class App {
  constructor() {
    this.state = {};
  }

  registerGlobals() {
    global.app = use('App');
    global.Helpers = use('Helpers');
    global.config = use('Config');
    global.response = use('Response');
    global.request = use('Request');
    global.state = use('State');
    global.EXP = use('Exception');

    global.Route = function (hash) {
      hash = hash.split('@');
      return make(use(hash[0]))[hash[1]]();
    }

    use('Event').fire('app:registerGlobals');
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