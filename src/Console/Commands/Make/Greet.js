const BaseCommand = require('../BaseCommand');

class MakeCommand extends BaseCommand {

  static get signature() {
    return 'make:greet';
  }

  static get description() {
    return 'Create a new Greet command.';
  }

  handle({
    name
  }) {
    const data = {
      name
    };

    if (this.checkIfExists(Helpers.appRoot(`/app/Console/Commands/GreetCommand.js`))) {
      return this.error(`${this.icon('error')} The command 'Greet' has already been created.`);
    }

    this.ejsToFile('greet', Helpers.appRoot(`/app/Console/Commands/GreetCommand.js`), data);

    this.success(`${this.icon('success')} The command 'greet' has been created.`);
    this.warn(`${this.icon('info')} Don't forget to register it in commands object in config/app.`);

  }
}

module.exports = MakeCommand;