'use strict';

const Route = require('lesswork-framework/src/Route')(process.cwd());

module.exports = {
  get: function () {
    Route(arguments, 'App/Http/Controllers/<%= name %>Controller@get');
  }
};