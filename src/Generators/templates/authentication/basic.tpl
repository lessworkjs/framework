'use strict';

const Route = require('lesswork-framework/src/Route');

const Basic = require('lesswork-framework/Authentication/Basic');

module.exports = {
  auth: function () {
    Route(arguments, function () {
      new Basic().auth('test', 'test');
    });
  },

  serverless: {
    Authentication<%= name %>Basic: {
      handler: 'app/Http/Authentication/<%= name %>Basic.auth',
      documentation: {
        description: 'Basic Auth.'
      }
    }
};