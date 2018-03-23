const BaseCommand = require('../BaseCommand');
const fs = require('fs');

class MakeRoute extends BaseCommand {

  static get signature() {
    return 'make:auth {name: Name of the route}';
  }

  static get description() {
    return 'Create a new authentication provider.';
  }

  handle({
    name
  }) {
    const data = {
      name
    };

    this.mkdir('./app/Http/Authentication/');

    this.ejsToFile('authentication/baisc', `./app/Http/Authentication/${name}Basic.js`, data);

    console.log(`The auth provider '${name}' has created.`);

  }

}

module.exports = MakeRoute;