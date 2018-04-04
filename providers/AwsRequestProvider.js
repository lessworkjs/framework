const {
  ServiceProvider,
} = require('@adonisjs/fold');

class AwsRequestProvider extends ServiceProvider {
  /**
   * Register method called by the Ioc container
   * to register the provider
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    this.app.bind('Lesswork/Src/Request/Aws', (app) => {
      const Request = require('../src/Request/Aws');

      return new Request(app.use('State'));
    });
  }
}

module.exports = AwsRequestProvider;