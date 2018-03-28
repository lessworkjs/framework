const {
  Command
} = require('lesswork-cmd');

class testCommands extends Command {

  static get signature() {
    return 'example:test';
  }

  static get description() {
    return 'Command description';
  }

  handle() {
    console.log(`Command executed.`);
  }

}

module.exports = testCommands;