'use strict';

const Kernel = require('lesswork-framework/src/Route/Kernel');

module.exports = {
  handle: function () {
    Kernel(arguments, function () {
      State.callback(null, 'success');
    });
  },

  serverless: {
    <%= name %>Function: {
      handler: 'app/Http/Functions/<%= name %>Function.handle',
    }
  }
};