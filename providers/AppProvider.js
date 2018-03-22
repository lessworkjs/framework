'use strict';

const {
  ServiceProvider
} = require('adonis-fold');

class AppProvider extends ServiceProvider {
  /**
   * Register method called by the Ioc container
   * to register the provider
   *
   * @method register
   *
   * @return {void}
   */
  * register() {
    this.app.singleton('Lesswork/App', function (app) {
      const App = require('../lib/app');

      return new App();
    });

    global.env = function (hash) {
      return process.env[hash];
    };
  }
}

module.exports = AppProvider;