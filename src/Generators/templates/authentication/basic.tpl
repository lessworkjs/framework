'use strict';

const Kernel = require('lesswork-framework/src/Route/Kernel');

const Basic = require('lesswork-framework/src/Authentication/Basic');

module.exports = {
  auth: function () {
    Kernel(arguments, function () {
      new Basic().auth('test', 'test');
    });
  },

  serverless: {
    AuthenticationBasic: {
      handler: 'app/Http/Authentication/Basic.auth',
      documentation: {
        description: 'Basic Auth.'
      }
    }
  }
};