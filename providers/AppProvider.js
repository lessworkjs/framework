const {
  ServiceProvider,
} = require('@adonisjs/fold');

class AppProvider extends ServiceProvider {
  registerApp() {
    this.app.singleton('Lesswork/Src/App', (app) => {
      const App = require('../src/App');

      return new App();
    });

    return this;
  }

  registerConfig() {
    this.app.singleton('Lesswork/Src/Config', (app) => {
      const Config = require('@adonisjs/framework/src/Config');

      return new Config(app.use('Helpers').configPath());
    });
    this.app.alias('Lesswork/Src/Config', 'Adonis/Src/Config');

    return this;
  }

  registerRoute() {
    this.app.singleton('Lesswork/Src/Route', () => {
      return require('../src/Route');
    });

    return this;
  }

  registerCommand() {
    this.app.bind('Lesswork/Src/Command', () => {
      const work = require('@adonisjs/ace');

      return work.Command;
    });
    this.app.alias('Lesswork/Src/Command', 'Adonis/Src/Command');

    return this;
  }

  registerEnv() {
    this.app.singleton('Lesswork/Src/Env', (app) => {
      const Env = require('@adonisjs/framework/src/Env');

      return new Env(app.use('Helpers')._appRoot);
    });
    this.app.alias('Lesswork/Src/Env', 'Adonis/Src/Env');

    return this;
  }

  registerException() {
    this.app.bind('Lesswork/Src/Exception', () => {
      const Exception = require('@adonisjs/framework/src/Exception');

      return Exception;
    });
    this.app.alias('Lesswork/Src/Exception', 'Adonis/Src/Exception');

    return this;
  }

  register() {
    this.registerApp()
      .registerConfig()
      .registerCommand()
      .registerEnv()
      .registerException()
      .registerRoute();
  }
}

module.exports = AppProvider;