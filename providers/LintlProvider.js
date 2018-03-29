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
    this.app.singleton('Lesswork/Src/Lintl', function (app) {
      const Lintl = require('../src/Lintl');

      return new Lintl(use('App'), use('Helpers'), use('Config').get('app.fallback_locale'));
    });
  }
}

module.exports = LintlProvider;