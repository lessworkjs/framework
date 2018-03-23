const {
  Command
} = require('lesswork-cmd');

class <%= name %>Commands extends Command {

  static get signature() {
    return 'example:<%= name %>';
  }

  static get description() {
    return 'Command description';
  }

  handle() {
    console.log(`Command executed.`);
  }

}

module.exports = <%= name %>Commands;