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
    this.app.singleton('Lesswork/Request', function (app) {
      const Request = require('../Request');

      return new Request();
    });
  }
}

module.exports = RequestProvider;