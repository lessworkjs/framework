const BaseCommand = require('../BaseCommand');

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

    this.ejsToFile('controller', `./app/Http/Controllers/${name}.js`, data)
      .ejsToFile('function', `./config/functions/${name}.yml`, data)
      .ejsToFile('test', `./test/${name}Test.js`, data);

    console.log(`The route '${name}' has created.`);

  }

}

module.exports = MakeRoute;