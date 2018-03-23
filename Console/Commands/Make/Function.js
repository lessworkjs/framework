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

    this.mkdir('./app/Http/Functions/');

    this.ejsToFile('function', `./app/Http/Functions/${name}Function.js`, data);

    console.log(`${this.icon('success')} The function '${name}' has been created.`);
  }
}

module.exports = MakeFunction;