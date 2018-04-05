const {
  ServiceProvider,
} = require('@adonisjs/fold');

class EventProvider extends ServiceProvider {
  /**
   * Register method called by the Ioc container
   * to register the provider
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    this.app.singleton('Lesswork/Src/Event', (app) => {
      const Event = require('@adonisjs/framework/src/Event');

      return new Event(app.use('Config'), app.use('Helpers'));
    });
    this.app.alias('Lesswork/Src/Event', 'Adonis/Src/Event');
    this.app.alias('Lesswork/Src/Event', 'Event');
  }
}

module.exports = EventProvider;