const {
  Command
} = require('lesswork-cmd');

class <%= name %> extends Command {

  static get signature() {
    return '<%= name %>';
  }

  static get description() {
    return 'Command description';
  }

  handle() {
    console.log(`Command executed.`);
  }

}

module.exports = <%= name %>;