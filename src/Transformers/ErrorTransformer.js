'use strict';

class ErrorTransformer {
  transform(error) {
    return {
      error: error.name,
      message: error.message,
      statusCode: error.status,
    };
  }
}

module.exports = new ErrorTransformer();