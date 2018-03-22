'use strict';

const {
  ServiceProvider
} = require('adonis-fold');

const path = require('path');

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
      const App = require('../App');

      return new App();
    });

    this.app.singleton('Lesswork/Config', function (app) {
      const Config = require('../Config');

      return new Config();
    });

    this.app.alias('Adonis/Src/Config', 'Lesswork/Config');

    global.env = function (hash, alt) {
      return process.env[hash] || alt;
    };
  }
}

module.exports = AppProvider;