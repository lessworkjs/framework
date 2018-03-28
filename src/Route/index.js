'use strict';

const Kernel = require('./Kernel');

const Macroable = require('macroable');

class Route extends Macroable {
  constructor(args) {
    super();

    this._middleware = null;
    this._authorizer = null;
    this._arguments = args;

  }

  setArgs(args) {
    this._arguments = args;
    return this;
  }

  auth(authorizer) {
    this._authorizer = authorizer;
    return this;
  }

  middleware(middleware) {
    this._middleware = (typeof middleware === 'object') ? middleware : [middleware];
    return this;
  }

  run(method, path, callback, options = {}) {
    let middleware = this._middleware;
    let authorizer = this._authorizer;

    return Kernel(this._arguments, path, callback, Object.assign({
      method,
      middleware,
      authorizer,
    }, options));
  }

  get() {
    return this.run('get', ...arguments);
  }

  post() {
    return this.run('post', ...arguments);
  }

  put() {
    return this.run('put', ...arguments);
  }

  patch() {
    return this.run('patch', ...arguments);
  }

  delete() {
    return this.run('delete', ...arguments);
  }

  options() {
    return this.run('options', ...arguments);
  }

  connect() {
    return this.run('connect', ...arguments);
  }
}

const route = new Route();

module.exports = function (args) {
  return route.setArgs(args);
};