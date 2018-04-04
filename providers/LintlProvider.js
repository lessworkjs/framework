const {
  ServiceProvider,
} = require('@adonisjs/fold');

class LintlProvider extends ServiceProvider {
  /**
   * Register method called by the Ioc container
   * to register the provider
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    this.app.singleton('Lesswork/Src/Lintl', (app) => {
      const Lintl = require('../src/Lintl');

      return new Lintl(app.use('App'), app.use('Helpers'), app.use('Config').get('app.fallback_locale'));
    });
  }
}

module.exports = LintlProvider;