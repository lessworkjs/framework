'use strict';

const Response = require('lesswork-framework/lib/response');

module.exports.handle = (event, context, callback) => {
  const response = {
    
  };

  Response.success(null, response, results => {
    return results;
  }, callback);
};