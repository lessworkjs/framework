const BaseCommand = require('../BaseCommand');

class MakeRoute extends BaseCommand {

  static get signature() {
    return 'make:auth';
  }

  static get description() {
    return 'Scaffold basic and jwt authentication providers.';
  }

  handle({
    name
  }) {
    const data = {
      name
    };

    this.mkdir('./app/Http/Authentication/');

    this.ejsToFile('authentication/basic', `./app/Http/Authentication/Basic.js`, data);
    this.ejsToFile('authentication/jwt', `./app/Http/Authentication/Jwt.js`, data);

    this.success(`${this.icon('success')} The authentication providers have been created.`);

  }

}

module.exports = MakeRoute;