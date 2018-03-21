const BaseCommand = require('../BaseCommand');

class MakeCommand extends BaseCommand {

  static get signature() {
    return 'make:command {name: Name of the route}';
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

    this.ejsToFile('command', `./app/Console/Commands/${name}.js`, data);

    console.log(`The command '${name}' has created.`);
  }
}

module.exports = MakeCommand;