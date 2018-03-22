'use strict';

const fold = require('adonis-fold');
const path = require('path');
const Helpers = require('lesswork-framework/Helpers');

const packageFile = require(path.join(__dirname, '/package.json'));

module.exports = function (appRoot) {
  const app = require(path.join(appRoot, './config/app'));

  return function (callback, providers) {
    providers = providers || app.providers;

    fold.Ioc.singleton('Lesswork/Helpers', function (app) {
      return new Helpers(appRoot);
    });

    fold.Ioc.alias('Adonis/Src/Helpers', 'Lesswork/Helpers');

    fold.Registrar
      .register(providers)
      .then(() => {
        fold.Ioc.aliases(app.aliases);

        if (packageFile.autoload) {
          for (let load in packageFile.autoload) {
            fold.Ioc.autoload(load, path.join(__dirname, packageFile.autoload[load]));
          }
        }

        use('App').registerGlobals();

        require(path.join(appRoot, './config/events'));

        callback();
      })
      .catch((error) => console.error(error.stack));
  }
};