const BaseCommand = require('../BaseCommand');

class MakeRoute extends BaseCommand {

  static get signature() {
    return 'make:route {name: Name of the route}';
  }

  static get description() {
    return 'Create a new route.';
  }

  handle({
    name
  }) {
    const data = {
      name
    };

    if (this.checkIfExists(Helpers.appRoot(`/app/Http/Routes/${name}.js`))) {
      return this.error(`${this.icon('error')} The route '${name}' has already been created.`);
    }

    this.ejsToFile('route', Helpers.appRoot(`/app/Http/Routes/${name}.js`), data);

    this.success(`${this.icon('success')} The route '${name}' has been created.`);
  }
}

module.exports = MakeRoute;