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

    this.ejsToFile('command', `./app/Console/Commands/${name}Commands.js`, data);

    console.log(`${this.icon('success')} The command '${name}' has been created.`);
    console.log(`${this.icon('info')} Don't forget to register it in commands object in config/app.`);

  }
}

module.exports = MakeCommand;