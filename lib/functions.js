'use strict';

/**
 * WIP
 * - refactor to class
 * - create a local index.js to support google
 * - local index refs this 
 * - what about dupe methods? get, get, need to prepend route info
 * 
 * Functions 
 * - export Kernel data to serverless.
 * 
 */

const fs = require('fs');
const path = require('path');
const debug = require('debug')('adonis:framework')
const util = require('util')

const Serverless = require('../src/Serverless');
const ServerlessConfig = new Serverless().config;

require('./env');

const parseRoutes = (directory) => {
  if (!fs.existsSync(directory)) {
    return {};
  }

  const slsConfig = new ServerlessConfig(directory);
  const results = {};

  fs.readdirSync(directory).forEach(function (file) {
    if (file.match('.js')) {
      const config = slsConfig.load(file).render();

      Object.assign(results, config);
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

  debug('Loading serverless configuration:', util.inspect(results, false, null))

  return results;
};