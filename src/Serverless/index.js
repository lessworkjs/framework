'use strict';

const path = require('path');
const _ = require('lodash');

class Serverless {
  constructor(baseDirectory) {
    baseDirectory = baseDirectory || process.cwd();
    this.serverless = require(path.join(baseDirectory, 'serverless.js'));
  }

  get(hash) {
    if (this.serverless[hash]) {
      return this.serverless[hash];
    }

    return this.serverless;
  }

  get provider() {
    if (this.serverless.provider) {
      return _.capitalize(this.serverless.provider.name)
    }

    return 'Aws';
  }

  get config() {
    try {
      return require(`./${this.provider}Config`);
    } catch (error) {
      throw new Error(`Your serverless provider '${this.provider}' is not supported. Check your serverless configuration 'provider.name' setting.`)
    }
  }
}

module.exports = Serverless;