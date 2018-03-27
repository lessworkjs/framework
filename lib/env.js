const path = require('path');

process.env = Object.assign(process.env, require(path.resolve(process.cwd(), '.env.js'))());

if (typeof global.env === 'undefined') {
  global.env = function (hash, alt) {
    if (!hash) {
      return process.env;
    }

    return process.env[hash] || alt;
  };
}