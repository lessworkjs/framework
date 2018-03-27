'use strict';

const PrettyError = require('pretty-error');

module.exports = function (error) {
  console.error(new PrettyError().render(error));
};