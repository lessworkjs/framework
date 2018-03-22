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
    this.app.singleton('Lesswork/State', function (app) {
      const State = require('../State');

      return new State();
    });

    this.app.singleton('Lesswork/App', function (app) {
      const App = require('../App');

      return new App();
    });

    this.app.singleton('Lesswork/Config', function (app) {
      const Config = require('../Config');

      return new Config();
    });
    this.app.alias('Adonis/Src/Config', 'Lesswork/Config');

    this.app.singleton('Lesswork/Command', function (app) {
      const work = require('lesswork-cmd');

      return work;
    });
    this.app.alias('Adonis/Src/Command', 'Lesswork/Command');

    this.app.singleton('Lesswork/Helpers', function (app) {
      const Helpers = require('../Helpers');

      return new Helpers();
    });
    this.app.alias('Adonis/Src/Helpers', 'Lesswork/Helpers');

    this.app.singleton('Lesswork/Env', function (app) {
      const Env = require('../Env');

      return new Env();
    });
    this.app.alias('Adonis/Src/Env', 'Lesswork/Env');

    global.env = function (hash, alt) {
      return process.env[hash] || alt;
    };
  }
}

module.exports = AppProvider;