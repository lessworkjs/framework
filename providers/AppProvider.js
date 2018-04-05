const {
  ServiceProvider,
} = require('@adonisjs/fold');

class AppProvider extends ServiceProvider {
  registerApp() {
    this.app.singleton('Lesswork/Src/App', () => {
      const App = require('../src/App');

      return new App();
    });
    this.app.alias('Lesswork/Src/App', 'App');

    return this;
  }

  registerConfig() {
    this.app.singleton('Lesswork/Src/Config', (app) => {
      const Config = require('@adonisjs/framework/src/Config');

      return new Config(app.use('Helpers').configPath());
    });
    this.app.alias('Lesswork/Src/Config', 'Adonis/Src/Config');
    this.app.alias('Lesswork/Src/Config', 'Config');

    return this;
  }

  registerRoute() {
    this.app.singleton('Lesswork/Src/Route', () => require('../src/Route'));
    this.app.alias('Lesswork/Src/Route', 'Route');

    return this;
  }

  registerCommand() {
    this.app.bind('Lesswork/Src/Command', () => {
      const work = require('@adonisjs/ace');

      return work.Command;
    });
    this.app.alias('Lesswork/Src/Command', 'Adonis/Src/Command');
    this.app.alias('Lesswork/Src/Command', 'Command');

    return this;
  }

  registerEnv() {
    this.app.singleton('Lesswork/Src/Env', (app) => {
      const Env = require('@adonisjs/framework/src/Env');

      return new Env(app.use('Helpers').appRoot());
    });
    this.app.alias('Lesswork/Src/Env', 'Adonis/Src/Env');
    this.app.alias('Lesswork/Src/Env', 'Env');

    return this;
  }

  registerException() {
    this.app.bind('Lesswork/Src/Exception', () => {
      const Exception = require('@adonisjs/framework/src/Exception');

      return Exception;
    });
    this.app.alias('Lesswork/Src/Exception', 'Adonis/Src/Exception');
    this.app.alias('Lesswork/Src/Exception', 'Exception');

    return this;
  }

  registerExceptionHandler() {
    this.app.bind('Adonis/Exceptions/BaseExceptionHandler', () => require('@adonisjs/framework/src/Exception/BaseHandler'));
    this.app.alias('Adonis/Exceptions/BaseExceptionHandler', 'BaseExceptionHandler');

    return this;
  }

  register() {
    this.registerApp()
      .registerConfig()
      .registerCommand()
      .registerEnv()
      .registerException()
      .registerExceptionHandler()
      .registerRoute();
  }
}

module.exports = AppProvider;