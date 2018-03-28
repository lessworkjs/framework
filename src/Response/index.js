'use strict';

const Macroable = require('macroable');

/**
 * Response Class
 *
 * @alias Response
 * @namespace Lesswork/Src/Response
 * @group Core
 *
 * @class Response
 */
class Response extends Macroable {
  constructor(state) {
    super();
    this.state = state;
  }

  body(code, body) {
    return {
      statusCode: code,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: body ? JSON.stringify(body) : {},
      isBase64Encoded: false
    };
  }

  error(error, statusCode) {
    this.state.callback(null, this.body(statusCode || 500, error));
  }

  successOrError(...args) {
    if (args[0] !== null) {
      return this.error(args[0]);
    }

    this.success(...args.slice(1));
  }

  success(...args) {
    let statusCode = 200;
    let data = null;

    if (!args) {
      statusCode = 204;
    }

    if (args[0]) {
      data = args[0];
    }

    if (args[1] && typeof args[1] === 'function') {
      data = args[1](data);
    }

    if (args[1] && typeof args[1] === 'number' || args[2]) {
      statusCode = args[2] || args[1];
    }

    this.state.callback(null, this.body(statusCode, data));
  }
}

module.exports = Response;