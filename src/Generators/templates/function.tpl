'use strict';

const Route = require('lesswork-framework/src/Route')(process.cwd());

module.exports = {
  handle: function () {
    Route(arguments, function () {
      callback(null, 'success');
    });
  },

  config: {
    Function<%= name %>: {
      handler: 'app/Http/Functions/<%= name %>Function.handle',
    }
  }
};