'use strict';

const {
  ServiceProvider
} = require('adonis-fold');

class ResponseProvider extends ServiceProvider {
  /**
   * Register method called by the Ioc container
   * to register the provider
   *
   * @method register
   *
   * @return {void}
   */
  * register() {
    this.app.singleton('Lesswork/Src/Response', function (app) {
      const Response = require('../src/Response');

      return new Response(use('State'));
    });
  }
}

module.exports = ResponseProvider;