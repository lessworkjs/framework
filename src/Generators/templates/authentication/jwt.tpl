'use strict';

const Route = require('lesswork-framework/src/Route');

const Jwt = require('lesswork-framework/Authentication/Jwt');

module.exports = {
  auth: function () {
    Route(arguments, function () {
      new Jwt().auth(env('APP_KEY'));
    });
  },

  serverless: Authentication<%= name %>Jwt: {
      handler: 'app/Http/Authentication/<%= name %>Jwt.auth',
      documentation: {
        description: 'Jwt Auth.'
      }
    }
};