'use strict';

module.exports = function (error) {
  if (process.env.PRETTYERROR) {
    const PrettyError = require('pretty-error');
    return console.error(new PrettyError().render(error));
  }

  console.error('ERROR:', error);
};