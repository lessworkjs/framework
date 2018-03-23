const BaseCommand = require('../BaseCommand');
const fs = require('fs');

class MakeRoute extends BaseCommand {

  static get signature() {
    return 'make:route {name: Name of the route}';
  }

  static get description() {
    return 'Create a new route. Includes controller, function, and test.';
  }

  handle({
    name
  }) {
    const data = {
      name
    };

    this.ejsToFile('controller', `./app/Http/Controllers/${name}Controller.js`, data)
      .ejsToFile('route', `./app/Http/Routes/${name}Route.js`, data)
      .ejsToFile('test', `./test/${name}Test.js`, data);

    console.log(`The route '${name}' has created.`);
  }
}

module.exports = MakeRoute;