const {
  ServiceProvider,
} = require('@adonisjs/fold');

class AwsStateProvider extends ServiceProvider {
  /**
   * Register method called by the Ioc container
   * to register the provider
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    this.app.singleton('Lesswork/Src/State/Aws', () => {
      const State = require('../src/State/Aws');

      return new State();
    });
    this.app.alias('Lesswork/Src/State/Aws', 'State');
  }
}

module.exports = AwsStateProvider;