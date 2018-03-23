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

    this.mkdir('./app/Http/Controllers/');
    this.mkdir('./app/Http/Routes/');

    this.ejsToFile('controller', `./app/Http/Controllers/${name}Controller.js`, data)
      .ejsToFile('route', `./app/Http/Routes/${name}Route.js`, data)
      .ejsToFile('test', `./test/${name}Test.js`, data);

    console.log(`${this.icon('success')} The endpoint '${name}' has been created.`);
  }
}

module.exports = MakeEndpoint;