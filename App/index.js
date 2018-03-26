'use strict';

const Macroable = require('macroable');
const path = require('path');

class App extends Macroable {
  constructor() {
    super();
  }

  registerGlobals() {
    global.app = use('App');
    global.Helpers = use('Helpers');
    global.config = use('Config');
    global.response = use('Response');
    global.request = use('Request');
    global.state = use('State');
    global.EXP = use('Exception');
    global.Route = use('Route');

    use('Event').fire('app:registerGlobals');
  }

  local() {
    process.env = Object.assign(process.env, require(path.resolve(process.cwd(), '.env.js'))());
  }

  run(callback) {
    if (typeof callback === 'string') {
      callback = Route(callback);
    }

    return require('co')(callback);
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