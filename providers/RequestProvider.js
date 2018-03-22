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
    this.app.bind('Lesswork/Request', function (app) {
      const Request = require('../Request');

      return new Request(use('State'));
    });
  }
}

module.exports = RequestProvider;