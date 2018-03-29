'use strict';

const Kernel = require('../Kernel');
const Macroable = require('macroable');

/**
 * Route Class
 *
 * @alias Route
 * @namespace Lesswork/Src/Route
 * @group Core
 *
 * @class Request
 */
class Route extends Macroable {
  constructor(args, appRoot) {
    super();

    this._middleware = null;
    this._authorizer = null;
    this._arguments = args;
    this._appRoot = appRoot || process.cwd();

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

    return new Kernel(this._arguments, this._appRoot).handle(path, callback, Object.assign({
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

module.exports = Route;