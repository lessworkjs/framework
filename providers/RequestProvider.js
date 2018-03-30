'use strict';

const {
  ServiceProvider
} = require('adonis-fold');

class RequestProvider extends ServiceProvider {
  /**
   * Register method called by the Ioc container
   * to register the provider
   *
   * @method register
   *
   * @return {void}
   */
  * register() {
    this.app.bind('Lesswork/Src/Request/Aws', function (app) {
      const Request = require('../src/Request/Aws');

      return new Request(use('State'));
    });
  }
}

module.exports = RequestProvider;