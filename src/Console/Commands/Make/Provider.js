const BaseCommand = require('../BaseCommand');

class MakeController extends BaseCommand {

  static get signature() {
    return 'make:provider {name: Name of the provider}';
  }

  static get description() {
    return 'Create a new provider.';
  }

  handle({
    name
  }) {
    const data = {
      name
    };

    if (this.checkIfExists(Helpers.appRoot(`/app/Providers/${name}Provider.js`))) {
      return this.error(`${this.icon('error')} The provider '${name}' has already been created.`);
    }

    this.mkdir('./app/Providers/');

    this.ejsToFile('provider', Helpers.appRoot(`/app/Providers/${name}Provider.js`), data);

    this.success(`${this.icon('success')} The provider '${name}' has been created.`);
    this.warn(`${this.icon('info')} Don't forget to register it in providers object in config/app.`);
  }
}

module.exports = MakeController;