const BaseCommand = require('./BaseCommand');
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
    process.env = Object.assign(process.env, require(path.resolve(process.cwd(), '.env.js'))());

    this.success(`Lesswork Tinker: ${app.environment()}`);

    repl.start(`>>> `);
  }
}

module.exports = Serve;