'use strict';

const {
  ServiceProvider
} = require('adonis-fold');

class TranslationProvider extends ServiceProvider {
  /**
   * Register method called by the Ioc container
   * to register the provider
   *
   * @method register
   *
   * @return {void}
   */
  * register() {
    this.app.singleton('Lesswork/Translation', function (app) {
      const Translation = require('../Translation');

      return new Translation(config.get('app.fallback_locale'));
    });
  }
}

module.exports = TranslationProvider;