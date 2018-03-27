'use strict';

const Route = require('lesswork-framework/src/Route');

module.exports = {
  handle: function () {
    Route(arguments, function () {
      State.callback(null, 'success');
    });
  },

  serverless: {
    <%= name %>Function: {
      handler: 'app/Http/Functions/<%= name %>Function.handle',
    }
  }
};