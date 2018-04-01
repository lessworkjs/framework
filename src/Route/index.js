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
    this._documentation = {};
    this._arguments = args;
    this._appRoot = appRoot || process.cwd();
  }

  docs(documentation) {
    this._documentation = documentation;
    return this;
  }

  description(description) {
    this._documentation.description = description;
    return this;
  }

  requestModels(requestModels) {
    if (typeof requestModels !== 'object') {
      requestModels = {
        'application/json': requestModels
      };
    }

    this._documentation.requestModels = requestModels;
    return this;
  }

  methodResponses(methodResponses) {
    if (typeof methodResponses !== 'object') {
      methodResponses = [methodResponses];
    }

    this._documentation.methodResponses = methodResponses;
    return this;
  }

  tags(tags) {
    if (typeof tags !== 'object') {
      tags = [tags];
    }

    this._documentation.tags = tags;
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

  setOptions(method, path, callback, options = {}) {
    this._method = method;
    this._path = path;
    this._callback = callback;
    this._options = options;
    return this;
  }

  handle() {
    const options = Object.assign({
      method: this._method,
      middleware: this._middleware,
      authorizer: this._authorizer,
      documentation: this._documentation,
    }, this._options);

    if (process.env.LESSWORK_FUNCTION_MODE) {
      return [
        [this._arguments, this._appRoot],
        this._path,
        this._callback,
        options,
      ];
    }

    return new Kernel(this._arguments, this._appRoot).handle(this._path, this._callback, options);
  }

  get() {
    return this.setOptions('get', ...arguments);
  }

  post() {
    return this.setOptions('post', ...arguments);
  }

  put() {
    return this.setOptions('put', ...arguments);
  }

  patch() {
    return this.setOptions('patch', ...arguments);
  }

  delete() {
    return this.setOptions('delete', ...arguments);
  }

  options() {
    return this.setOptions('options', ...arguments);
  }

  connect() {
    return this.setOptions('connect', ...arguments);
  }
}

module.exports = Route;