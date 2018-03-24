'use strict';

const app = require('../../../bootstrap/app');

module.exports = {
  get: function () {
    app(arguments, 'App/Http/Controllers/<%= name %>Controller@get');
  },

  config: {
    <%= name %>: {
      handler: 'app/Http/Routes/<%= name %>Route.get',
      events: [{
        http: {
          path: '<%= name %>',
          method: 'get',
          cors: true,
          documentation: {
            description: '<%= name %> Route.',
            tags: [
              '<%= name %>'
            ]
          }
        }
      }]
    }
  }
};