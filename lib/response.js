'use strict';

class Response {
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

  failure(error, callback) {
    callback(null, this.body(500, error));
  }

  success(error, data, transform, callback, statusCode) {
    if (error) {
      return this.failure(error, callback);
    }

    callback(null, this.body(statusCode, transform(data)));
  }
}

module.exports = Response;