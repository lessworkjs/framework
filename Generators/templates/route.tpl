'use strict';

const app = require('../../../bootstrap/app');

const <%= name %>Controller = require('../Controllers/<%= name %>Controller');

module.exports = {
  get: function (event, context, callback) {
    app(arguments, function () {
      new <%= name %>Controller().get();
    });
  },

  config: `<%= name %>:
    handler: app/Http/Routes/<%= name %>Route.get
    events:
      - http:
          path: <%= name %>
          method: get
          cors: true
          documentation:
            description: "Returns Hello World!"
            tags:
              - "<%= name %>"`
};