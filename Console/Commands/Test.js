const BaseCommand = require('./BaseCommand');

class Test extends BaseCommand {

  static get signature() {
    return 'test {--coverage: with code coverage} {--sls: test serverless}';
  }

  static get description() {
    return 'Run tests.';
  }

  handle({}, {
    coverage,
    sls
  }) {
    if (coverage) {
      return this.run('npm run coverage');
    }

    if (sls) {
      return this.run('npm run test');
    }

    this.run('npm run test:local');
  }
}

module.exports = Test;