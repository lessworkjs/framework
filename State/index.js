'use strict';

class State {
  set(state) {
    this.state = state;
  }

  callback() {
    return this.state.callback;
  }
}

module.exports = State;