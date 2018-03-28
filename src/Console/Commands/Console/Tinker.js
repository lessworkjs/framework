const BaseCommand = require('../BaseCommand');
const repl = require('repl');
const path = require('path');

class Serve extends BaseCommand {

  static get signature() {
    return 'tinker';
  }

  static get description() {
    return 'Interact with your application.';
  }

  handle(options, flags) {
    this.success(`Lesswork Tinker: ${App.environment()}`);

    const _repl = repl.start(`>>> `);

    require('repl.history')(_repl, process.env.HOME + '/.node_history');
  }
}

module.exports = Serve;