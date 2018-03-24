'use strict';

const app = require('../../../bootstrap/app');

module.exports = {
  get: function (event, context, callback) {
    app(arguments, function () {
      make(use('App/Http/Controllers/<%= name %>Controller')).get();
    });
  },

  config: {
    work: {
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