'use strict';

const {
  ServiceProvider
} = require('adonis-fold');

class AwsStateProvider extends ServiceProvider {
  /**
   * Register method called by the Ioc container
   * to register the provider
   *
   * @method register
   *
   * @return {void}
   */
  * register() {
    this.app.singleton('Lesswork/Src/State/Aws', function (app) {
      const State = require('../src/State/Aws');

      return new State();
    });
  }
}

module.exports = AwsStateProvider;