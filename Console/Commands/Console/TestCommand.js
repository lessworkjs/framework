const BaseCommand = require('../BaseCommand');

class TestCommand extends BaseCommand {

  static get signature() {
    return 'test {--coverage: with code coverage} {--sls: test serverless}';
  }

  static get description() {
    return 'Run tests.';
  }

  handle(command, flags) {
    const {
      coverage,
      sls
    } = flags;

    if (coverage) {
      this.warn(`${this.icon('info')} Starting code coverage...`);

      return this.run('npm run coverage');
    }

    this.warn(`${this.icon('info')} Starting tests...`);

    if (sls) {
      return this.run('npm run test');
    }

    this.run('npm run test:local');
  }
}

module.exports = TestCommand;