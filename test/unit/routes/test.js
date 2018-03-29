'use strict';

const Route = require('../../../src/Route');

module.exports = {
  get: function () {
    return new Route(arguments).get('test', 'App/Http/Controllers/HomeController@index');
  },
};