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

const ServerlessConfig = require('../src/Serverless/Config');

require('./env');

const parseRoutes = (directory) => {
  if (!fs.existsSync(directory)) {
    return {};
  }

  const slsConfig = new ServerlessConfig(directory);
  const results = {};

  fs.readdirSync(directory).forEach(function (file) {
    if (file.match('.js')) {
      Object.assign(results, slsConfig.load(file).render());
    }
  }, this);

  return results;
};

module.exports = (baseDirectory) => {
  baseDirectory = baseDirectory || process.cwd();
  const directories = require(path.join(baseDirectory, 'config/app')).functions;
  const results = {};

  process.env.LESSWORK_FUNCTION_MODE = true;

  directories.map(function (directory) {
    Object.assign(results, parseRoutes(path.join(baseDirectory, 'app', directory, '/')));
  });

  delete process.env.LESSWORK_FUNCTION_MODE;

  return results;
};