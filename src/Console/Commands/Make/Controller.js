const BaseCommand = require('../BaseCommand');

class MakeController extends BaseCommand {

  static get signature() {
    return 'make:controller {name: Name of the controller}';
  }

  static get description() {
    return 'Create a new controller.';
  }

  handle({
    name
  }) {
    const data = {
      name
    };

    if (this.checkIfExists(Helpers.appRoot(`/app/Http/Controllers/${name}Controller.js`))) {
      return this.error(`${this.icon('error')} The controller '${name}' has already been created.`);
    }

    this.ejsToFile('controller', Helpers.appRoot(`/app/Http/Controllers/${name}Controller.js`), data);

    this.success(`${this.icon('success')} The controller '${name}' has been created.`);
  }
}

module.exports = MakeController;