'use strict';

const Middleware = require('./Middleware');
const path = require('path');

class Kernel {
  constructor(state, appRoot) {
    this._state = state || [{}, {}, () => {}];
    this._appRoot = appRoot || process.cwd();
  }

  handle(...args) {
    // TO-DO: refactor for appRoot update
    // Don't unshift, instead change rest of class to be.. a class :P.
    args.unshift(this._state);

    if (process.env.LESSWORK_FUNCTION_MODE) {
      return args;
    }

    const state = args[0];
    const lastArg = args[args.length - 1];

    let callback = args[1];

    if ((args.length === 3 && typeof lastArg !== 'object') || args.length === 4) {
      callback = args[2];
    }

    // TO-DO: refactor out th need...
    require('./lib')(this._appRoot)(function () {
      Event.fire('app:start');

      State.set(state);

      require(Helpers.appRoot('app/Http/Kernel'))

      const handle = function () {
        if (Helpers.isWorkCommand()) {
          return callback();
        }

        const config = typeof lastArg === 'object' ? lastArg : false;

        new Middleware(callback, config);
      }

      handle();

      Event.fire('app:end');
    });
  }
}

module.exports = Kernel;