const yaml = require('js-yaml');
const fs = require('fs');

const getConfigurationFromDirectory = (dir) => {
  let results = '';

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

    results += requireElement.config + '\n';

  }, this);

  return results;
};

module.exports = (dirs) => {
  const conf = dirs.map(function (dir) {
    return getConfigurationFromDirectory(dir);
  });

  return yaml.safeLoad(conf.join('\n'), 'utf8');
};