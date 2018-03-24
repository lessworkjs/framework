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

    if (!requireElement.config) {
      return;
    }

    results = Object.assign(results, requireElement.config);

  }, this);

  return results;
};

module.exports = (dirs) => {
  let conf = {};
  dirs.map(function (dir) {
    conf = Object.assign(conf, getConfigurationFromDirectory(dir));
  });

  return conf;
};