'use strict';

const app = require('../../../bootstrap/app');

module.exports = {
  get: function () {
    app(arguments, 'App/Http/Controllers/<%= name %>Controller@get');
  }
};