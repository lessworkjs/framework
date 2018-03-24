'use strict';

const fs = require('fs');

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

    let config = requireElement.config || false;

    if (!config) {
      const methods = ['get', 'post', 'patch', 'put', 'delete'];
      const fileName = element.split('.')[0];
      const _method = Object.getOwnPropertyNames(requireElement).filter(hash => !['constructor', 'config'].includes(hash));
      config = {};

      _method.forEach(function (method) {
        const path = methods.includes(method) ? fileName : `${fileName}.${method}`;

        config[`${fileName}${method}`] = {
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
      });
    }

    results = Object.assign(results, config);

  }, this);

  return results;
};

module.exports = (dirs) => {
  // horrible..

  let conf = {};
  dirs.map(function (dir) {
    conf = Object.assign(conf, getConfigurationFromDirectory(dir));
  });

  return conf;
};