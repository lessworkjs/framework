'use strict';

class State {
  set(state) {
    this.state = state;
    this.state.context.callbackWaitsForEmptyEventLoop = false;
  }

  callback() {
    return this.state.callback;
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