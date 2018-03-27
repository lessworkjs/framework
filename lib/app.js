'use strict';

module.exports = function (appRoot) {
  return function (...args) {
    if (process.env.LESSWORK_FUNCTION_MODE) {
      return args;
    }

    const state = args[0];

    let callback = args[1];

    if ((args.length === 3 && typeof args[args.length - 1] !== 'object') || args.length === 4) {
      callback = args[2];
    }

    require('./kernel')(appRoot)(function () {
      use('Event').fire('app:start');

      use('State').set(state);

      use('App').run(callback);

      use('Event').fire('app:end');
    });

    return args;
  };
};