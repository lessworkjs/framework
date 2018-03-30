'use strict';

const path = require('path');
const serverless = require(path.resolve(process.cwd(), 'serverless.js'));
const _ = require('lodash');

class ServerlessConfig {
  constructor(directory) {
    this.directory = directory;
  }

  load(file) {
    this.config = require(path.join(this.directory, file));

    this.setFile(file)
      .setMethod();

    return this;
  }

  setFile(file) {
    this.file = file;
    this.fileName = file.split('.')[0];

    return this;
  }

  setMethod() {
    this.methods = Object.getOwnPropertyNames(this.config).filter(hash => !['constructor', 'serverless'].includes(hash));

    return this;
  }

  getConfigFromMethods() {
    const configEntries = {};

    this.methods.forEach((method) => {
      this.makeConfig(method, configEntries)
    });

    return configEntries;
  }

  makeConfig(method, configEntries) {
    const args = this.config[method]();
    let config;

    if (args) {
      config = {};
      const lastArg = args[args.length - 1];

      if ((args.length === 3 && typeof lastArg === 'object') || args.length === 4) {
        config = lastArg;
      }

      if ((args.length === 3 && typeof lastArg !== 'object') || args.length === 4) {
        config.path = args[1];
      }

      if (config.middleware) {
        delete config.middleware;
      }
    }

    const httpMethods = ['get', 'post', 'patch', 'put', 'delete'];

    const path = httpMethods.includes(method) ? this.fileName : `${this.fileName}.${method}`;

    const newConfig = configEntries[`${_.camelCase(this.fileName)}${_.toUpper(method)}`] = {
      handler: `routes/${this.fileName}.${method}`,
      events: [{
        http: {
          path: path,
          method: httpMethods.includes(method) ? method : 'get',
          cors: true,
        }
      }]
    };

    if (serverless.plugins && serverless.plugins.includes('serverless-aws-documentation')) {
      newConfig.events[0].http.documentation = {
        description: `routes/${this.fileName}@${method}`,
        tags: [
          this.fileName
        ]
      };
    }

    if (config) {
      for (let conf in config) {
        newConfig.events[0].http[conf] = config[conf];
      }
    }
  }

  render() {
    let results = this.config.serverless || false;

    if (!results) {
      results = this.getConfigFromMethods();
    }

    if (Object.keys(results).length != this.methods.length) {
      throw new Error(`Missing configuration on '${this.fileName}'`);
    }

    return results;
  }

}

module.exports = ServerlessConfig;