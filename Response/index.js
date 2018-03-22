'use strict';

const Macroable = require('macroable');

class Response extends Macroable {
  constructor(state) {
    super();
    this.state = state;
  }

  body(code, body) {
    return {
      statusCode: code || 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(body),
      isBase64Encoded: false
    };
  }

  failure(error, statusCode) {
    this.state.callback()(null, this.body(statusCode || 500, error));
  }

  successOrFailure() {
    if (arguments[0] !== null) {
      return this.failure(arguments[0]);
    }

    const args = [].slice.call(arguments);
    this.success(...args.slice(1));
  }

  success() {

    let statusCode = 200;
    let data = null;

    if (!arguments) {
      statusCode = 204;
    }

    if (arguments[0]) {
      data = arguments[0];
    }

    if (arguments[1] && typeof arguments[1] === 'function') {
      data = arguments[1](data);
    }

    if (arguments[1] && typeof arguments[1] === 'number' || arguments[2]) {
      statusCode = arguments[2] || arguments[1];
    }

    this.state.callback()(null, this.body(statusCode, data));
  }
}

module.exports = Response;