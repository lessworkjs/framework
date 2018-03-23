const BaseCommand = require('../BaseCommand');

class MakeCommand extends BaseCommand {

  static get signature() {
    return 'make:greet';
  }

  static get description() {
    return 'Create the Greet example command.';
  }

  handle({
    name
  }) {
    const data = {
      name
    };

    this.ejsToFile('greet', `./app/Console/Commands/GreetCommand.js`, data);

    console.log(`${this.icon('success')} The command 'greet' has been created.`);
    console.log(`${this.icon('info')} Don't forget to register it in commands object in config/app.`);

  }
}

module.exports = MakeCommand;