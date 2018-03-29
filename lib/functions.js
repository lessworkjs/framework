'use strict';

/**
 * WIP
 * - refactor to class
 * - export new class().handle()
 * 
 * Functions 
 * - export Kernel data to serverless.
 * 
 */

const fs = require('fs');
const path = require('path');
const _ = require('lodash');

require('./env')

const serverless = require(path.resolve(process.cwd(), 'serverless.js'));

const parseRoutes = (dir) => {
  let results = {};

  if (!fs.existsSync(dir)) {
    return results;
  }

  fs.readdirSync(dir).forEach(function (element) {
    if (!element.match('.js')) {
      return;
    }

    const requireElement = require(dir + element);

    let defs = null;

    const _method = Object.getOwnPropertyNames(requireElement).filter(hash => !['constructor', 'serverless'].includes(hash));
    const fileName = element.split('.')[0];

    let config = requireElement.serverless || false;

    if (!config) {
      const methods = ['get', 'post', 'patch', 'put', 'delete'];

      config = {};

      _method.forEach((method) => {
        const args = requireElement[method]();

        if (args) {
          this.config = {};
          const lastArg = args[args.length - 1];

          if ((args.length === 3 && typeof lastArg === 'object') || args.length === 4) {
            this.config = lastArg;
          }

          if ((args.length === 3 && typeof lastArg !== 'object') || args.length === 4) {
            this.config.path = args[1];
          }

          if (this.config.middleware) {
            delete this.config.middleware;
          }
        }

        const path = methods.includes(method) ? fileName : `${fileName}.${method}`;

        const _config = config[`${_.camelCase(fileName)}${_.toUpper(method)}`] = {
          handler: `routes/${fileName}.${method}`,
          events: [{
            http: {
              path: path,
              method: methods.includes(method) ? method : 'get',
              cors: true,
            }
          }]
        };

        if (serverless.plugins && serverless.plugins.includes('serverless-aws-documentation')) {
          _config.events[0].http.documentation = {
            description: `routes/${fileName}@${method}`,
            tags: [
              fileName
            ]
          };
        }

        if (this.config) {
          for (let conf in this.config) {
            _config.events[0].http[conf] = this.config[conf];
          }
        }
      });
    }

    if (Object.keys(config).length != _method.length) {
      throw new Error(`Missing configuration on '${fileName}'`);
    }

    results = Object.assign(results, config);

  }, this);

  return results;
};

module.exports = (base) => {
  base = base || process.cwd();
  const dirs = require(path.resolve(base, 'config/app')).functions;

  process.env.LESSWORK_FUNCTION_MODE = true;

  let conf = {};

  dirs.map(function (dir) {
    conf = Object.assign(conf, parseRoutes(path.join(base, 'app/', dir, '/')));
  });

  delete process.env.LESSWORK_FUNCTION_MODE;

  return conf;
};