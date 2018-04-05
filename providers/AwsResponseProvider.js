const {
  ServiceProvider,
} = require('@adonisjs/fold');

class AwsResponseProvider extends ServiceProvider {
  /**
   * Register method called by the Ioc container
   * to register the provider
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    this.app.singleton('Lesswork/Src/Response/Aws', (app) => {
      const Response = require('../src/Response/Aws');

      return new Response(app.use('State'));
    });
    this.app.alias('Lesswork/Src/Response/Aws', 'Response');
  }
}

module.exports = AwsResponseProvider;