'use strict';

const {
  ServiceProvider
} = require('adonis-fold');

class LintlProvider extends ServiceProvider {
  /**
   * Register method called by the Ioc container
   * to register the provider
   *
   * @method register
   *
   * @return {void}
   */
  * register() {
    this.app.singleton('Lesswork/Lintl', function (app) {
      const Lintl = require('../src/Lintl');

      return new Lintl(config.get('app.fallback_locale'));
    });
  }
}

module.exports = LintlProvider;