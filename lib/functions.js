'use strict';

const fs = require('fs');
const path = require('path');

const getConfigurationFromDirectory = (dir) => {
  let results = {};

  if (!fs.existsSync(dir)) {
    return results;
  }

  fs.readdirSync(dir).forEach(function (element) {
    if (!element.match('.js')) {
      return;
    }

    const requireElement = require(dir + element);
    const _method = Object.getOwnPropertyNames(requireElement).filter(hash => !['constructor', 'config', 'defs'].includes(hash));
    const fileName = element.split('.')[0];

    let config = requireElement.config || false;

    if (!config) {
      const methods = ['get', 'post', 'patch', 'put', 'delete'];

      config = {};

      _method.forEach(function (method) {
        const path = methods.includes(method) ? fileName : `${fileName}.${method}`;

        const _config = config[`${fileName}${method}`] = {
          handler: `app/Http/Routes/${fileName}.${method}`,
          events: [{
            http: {
              path: path,
              method: methods.includes(method) ? method : 'get',
              cors: true,
              documentation: {
                description: `App/Http/Routes/${fileName}@${method}`,
                tags: [
                  fileName
                ]
              }
            }
          }]
        };

        if (requireElement.defs) {
          if (requireElement.defs[method] && requireElement.defs[method].authorizer) {
            _config.events[0].http.authorizer = requireElement.defs[method].authorizer;
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

module.exports = (base, dirs) => {

  // horrible..

  let conf = {};
  dirs.map(function (dir) {
    conf = Object.assign(conf, getConfigurationFromDirectory(path.join(base, '/../app/', dir, '/')));
  });

  return conf;
};