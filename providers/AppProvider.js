'use strict';

const {
  ServiceProvider
} = require('adonis-fold');

const path = require('path');

class AppProvider extends ServiceProvider {

  registerState() {
    this.app.singleton('Lesswork/Src/State', function (app) {
      const State = require('../src/State');

      return new State();
    });

    return this;
  }

  registerApp() {
    this.app.singleton('Lesswork/Src/App', function (app) {
      const App = require('../src/App');

      return new App();
    });

    return this;
  }

  registerConfig() {
    this.app.singleton('Lesswork/Src/Config', function (app) {
      const Config = require('../src/Config');

      return new Config(use('Helpers').configPath());
    });
    this.app.alias('Adonis/Src/Config', 'Lesswork/Src/Config');

    return this;
  }

  registerRoute() {
    this.app.singleton('Lesswork/Src/Route', function (app) {
      return require('../src/Route');
    });

    return this;
  }

  registerCommand() {
    this.app.bind('Lesswork/Src/Command', function (app) {
      const work = require('lesswork-cmd');

      return work.Command;
    });
    this.app.alias('Adonis/Src/Command', 'Lesswork/Src/Command');

    return this;
  }

  registerEnv() {
    this.app.singleton('Lesswork/Src/Env', function (app) {
      const Env = require('../src/Env');

      return new Env(use('Helpers')._appRoot);
    });
    this.app.alias('Adonis/Src/Env', 'Lesswork/Src/Env');

    require('lesswork-framework/lib/env');

    return this;
  }

  registerException() {
    this.app.bind('Lesswork/Src/Exception', function (app) {
      const Exception = require('../src/Exception');

      return Exception;
    });
    this.app.alias('Adonis/Src/Exception', 'Lesswork/Src/Exception');

    return this;
  }

  * register() {
    this.registerState()
      .registerApp()
      .registerConfig()
      .registerCommand()
      .registerEnv()
      .registerException()
      .registerRoute();
  }
}

module.exports = AppProvider;