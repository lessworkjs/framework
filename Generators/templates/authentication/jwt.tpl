'use strict';

const app = require('../../../app');

const Jwt = require('lesswork-framework/Authentication/Jwt');

module.exports = {
  auth: function (event, context, callback) {
    app(arguments, function () {
      new Jwt().auth(env('APP_KEY'));
    });
  },

  config: `Authentication<%= name %>Jwt:
    handler: app/Http/Authentication/<%= name %>Jwt.auth
    documentation:
      description: "Jwt Auth Handler"`
};