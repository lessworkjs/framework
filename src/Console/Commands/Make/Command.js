const BaseCommand = require('../BaseCommand');

class MakeCommand extends BaseCommand {

  static get signature() {
    return 'make:command {name: Name of the command}';
  }

  static get description() {
    return 'Create a new command.';
  }

  handle({
    name
  }) {
    const data = {
      name
    };

    if (this.checkIfExists(Helpers.appRoot(`/app/Console/Commands/${name}Command.js`))) {
      return this.error(`${this.icon('error')} The command '${name}' has already been created.`);
    }

    this.ejsToFile('command', Helpers.appRoot(`/app/Console/Commands/${name}Command.js`), data);

    this.success(`${this.icon('success')} The command '${name}' has been created.`);
    this.warn(`${this.icon('info')} Don't forget to register it in commands object in config/app.`);

  }
}

module.exports = MakeCommand;