'use strict';

const app = require('../../../app');

module.exports = {
  handle: function (event, context, callback) {
    app(arguments, function () {
      callback(null, 'success');
    });
  },

  config: `Function<%= name %>:
    handler: app/Http/Functions/<%= name %>Function.handle`
};