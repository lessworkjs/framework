'use strict';

const Macroable = require('macroable');

/**
 * State Class
 *
 * @alias State
 * @binding Lesswork/State
 * @group Core
 *
 * @class State
 */
class State extends Macroable {
  set(args) {
    this.state = {
      event: args[0] || {},
      context: args[1] || {},
      callback: args[2] || function () {
        // console.log('State Callback:', arguments);
      }
    };

    this.state.context.callbackWaitsForEmptyEventLoop = false;

    this.callback = this.state.callback;
  }

  context(hash) {
    if (!hash) {
      return this.state.context;
    }

    return this.state.context[hash];
  }

  event(hash) {
    const event = this.state.event || false;

    if (!hash) {
      return event;
    }

    if (hash == 'body') {
      if (!event[hash]) {
        return {};
      }

      return JSON.parse(event[hash]);
    }

    return event[hash] || false;
  }
}

module.exports = State;