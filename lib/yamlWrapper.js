const yaml = require('js-yaml');
const fs = require('fs');

module.exports = (dir) => {
  const path = `${dir}/`;
  let results = '';

  fs.readdirSync(path).forEach(function (element) {
    if (element.match('.yml')) {
      results += fs.readFileSync(path + element);
    }
  }, this);

  return yaml.safeLoad(results, 'utf8');
};