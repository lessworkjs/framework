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

    this.mkdir('./app/Listeners/');

    this.ejsToFile('listener', `./app/Listeners/${name}.js`, data);

    console.log(`${this.icon('success')} The listener '${name}' has been created.`);
    console.log(`${this.icon('info')} Don't forget to register it in config/events.`);
  }
}

module.exports = MakeListener;