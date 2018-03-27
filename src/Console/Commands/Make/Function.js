const BaseCommand = require('../BaseCommand');

class MakeFunction extends BaseCommand {

  static get signature() {
    return 'make:function {name: Name of the function}';
  }

  static get description() {
    return 'Create a new function. Execute with `sls invoke [local] -f`';
  }

  handle({
    name
  }) {
    const data = {
      name
    };

    if (this.checkIfExists(Helpers.appRoot(`/app/Http/Functions/${name}Function.js`))) {
      return this.error(`${this.icon('error')} The function '${name}' has already been created.`);
    }

    this.mkdir('./app/Http/Functions/');

    this.ejsToFile('function', Helpers.appRoot(`/app/Http/Functions/${name}Function.js`), data);

    this.success(`${this.icon('success')} The function '${name}' has been created.`);
  }
}

module.exports = MakeFunction;