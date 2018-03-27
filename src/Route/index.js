'use strict';

module.exports = function (hash) {
  hash = hash.split('@');
  const route = hash[0];
  const method = hash[1];

  try {
    return make(use(route))[method]();
  } catch (e) {
    throw `Unable to load method '${method}' on '${route}'\n${Helpers.appRoot(hash[0])}.js\n${e}`;
  }
};