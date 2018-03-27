const BaseCommand = require('../BaseCommand');

class MakeListener extends BaseCommand {

  static get signature() {
    return 'make:listener {name: Name of the listener}';
  }

  static get description() {
    return 'Create a new listener.';
  }

  handle({
    name
  }) {
    const data = {
      name
    };

    if (this.checkIfExists(Helpers.appRoot(`/app/Http/Listeners/${name}Listener.js`))) {
      return this.error(`${this.icon('error')} The listener  '${name}' has already been created.`);
    }

    this.mkdir('./app/Listeners/');

    this.ejsToFile('listener', Helpers.appRoot(`/app/Listeners/${name}Listener.js`), data);

    this.success(`${this.icon('success')} The listener '${name}' has been created.`);
    this.warn(`${this.icon('info')} Don't forget to register it in config/events.`);
  }
}

module.exports = MakeListener;