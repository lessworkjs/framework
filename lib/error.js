/* eslint no-console: 0 */

const PrettyError = require('pretty-error');

module.exports = (error) => {
  if (process.env.PRETTYERROR) {
    return console.error(new PrettyError().render(error));
  }

  return console.error('ERROR:', error);
};