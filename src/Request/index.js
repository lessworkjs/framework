'use strict';

const Macroable = require('macroable');

/**
 * Request Class
 *
 * @alias Request
 * @namespace Lesswork/Src/Request
 * @group Core
 *
 * @class Request
 */
class Request extends Macroable {
  constructor(state) {
    super();

    this.state = state;
  }

  allParams() {
    return Object.assign(this.state.event('body'), this.state.event('queryStringParameters'));
  }

  all() {
    return this.allParams();
  }

  fetch(event, hash) {
    return this.state.event(event)[hash] || this.state.event(event);
  }

  input(hash) {
    return this.fetch('body', hash);
  }

  get(hash) {
    return this.fetch('queryStringParameters', hash);
  }

  headers(hash) {
    return this.fetch('headers', hash);
  }

  context(hash) {
    return this.fetch('requestContext', hash);
  }

  method() {
    return this.state.event('httpMethod');
  }
}

module.exports = Request;