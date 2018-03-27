'use strict';

const Route = require('lesswork-framework/src/Route');

module.exports = {
  get: function () {
    Route(arguments, 'App/Http/Controllers/<%= name %>Controller@get');
  }
};