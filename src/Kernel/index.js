'use strict';

const Run = require('./Run');

module.exports = function (...args) {
  if (process.env.LESSWORK_FUNCTION_MODE) {
    return args;
  }

  const state = args[0];
  const lastArg = args[args.length - 1];

  let callback = args[1];

  if ((args.length === 3 && typeof lastArg !== 'object') || args.length === 4) {
    callback = args[2];
  }

  require('../../lib/kernel')(process.cwd())(function () {
    Event.fire('app:start');

    State.set(state);

    use('App/Http/Kernel');

    new Run(callback, lastArg);

    Event.fire('app:end');
  });

  return args;
};