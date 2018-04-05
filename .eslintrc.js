module.exports = {
  "extends": "airbnb-base",
  "env": {
    "browser": false,
    "node": true
  },
  "rules": {
    "semi": [2, "always"],
    "eol-last": [2, "never"],
    "no-param-reassign": [0],
    "no-shadow": [0],
    "global-require": [0],
    "import/no-dynamic-require": [0],
    "class-methods-use-this": [0],
    "no-underscore-dangle": [0],
    "import/no-extraneous-dependencies": ["error", {
      "devDependencies": true,
      "optionalDependencies": false,
      "peerDependencies": false
    }]
  },
  "globals": {
    "App": true,
    "Helpers": true,
    "Config": true,
    "Response": true,
    "Request": true,
    "State": true,
    "EXP": true,
    "Lintl": true,
    "use": true,
    "__": true,
    "lang": true,
    "numberFormat": true,
    "dateFormat": true,
    "config": true,
    "env": true,
    "Env": true,
    "Event": true,
    "make": true,
    "response": true
  }
};