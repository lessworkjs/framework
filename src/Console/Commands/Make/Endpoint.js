const BaseCommand = require('../BaseCommand');
const fs = require('fs');

class MakeEndpoint extends BaseCommand {

  static get signature() {
    return 'make:endpoint {name: Name of the endpoint}';
  }

  static get description() {
    return 'Create a new route, controller and test.';
  }

  handle({
    name
  }) {
    const data = {
      name
    };

    if (this.checkIfExists([
        Helpers.appRoot(`/app/Http/Controllers/${name}Controller.js`),
        Helpers.appRoot(`/routes/${name}.js`),
        Helpers.appRoot(`/app/Http/Controllers/${name}Controller.js`),
        Helpers.appRoot(`/test/${name}Test.js`)
      ])) {
      return this.error(`${this.icon('error')} Part of the endpoint '${name}' has already been created.`);
    }

    this.mkdir(Helpers.appRoot('/app/Http/Controllers/'));

    this.ejsToFile('controller', Helpers.appRoot(`/app/Http/Controllers/${name}Controller.js`), data)
      .ejsToFile('route', Helpers.appRoot(`/routes/${name}.js`), data)
      .ejsToFile('test', Helpers.appRoot(`/test/${name}Test.js`), data);

    this.success(`${this.icon('success')} The endpoint '${name}' has been created.`);
  }
}

module.exports = MakeEndpoint;