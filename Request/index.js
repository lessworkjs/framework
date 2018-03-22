'use strict';

const Macroable = require('macroable');

class Request extends Macroable {
  constructor(state) {
    super();
    this.state = state;
  }

  all() {
    console.log('all', this.state)
  }

  input() {

  }

  get() {

  }
}

module.exports = Request;