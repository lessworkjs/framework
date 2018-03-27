'use strict';

const app = require('lesswork-framework/lib/app')(process.cwd());

module.exports = {
  get: function () {
    app(arguments, 'App/Http/Controllers/<%= name %>Controller@get');
  }
};