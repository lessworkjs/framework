const env = {
  APP_PORT: 3000,
  URL: 'http://127.0.0.1:3333',
  HELLO: 'WORLD'
};

module.exports = function () {
  return env;
};