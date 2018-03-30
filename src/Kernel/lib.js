'use strict';

const fold = require('adonis-fold');
const path = require('path');
const Globals = require('../Globals');

require('../../lib/env');

module.exports = function (appRoot) {

  const appConfig = require(path.join(appRoot, './config/app'));
  const packageFile = require(path.join(appRoot, '/package.json'));

  return function (callback, providers) {
    providers = providers || appConfig.providers;

    fold.Ioc.singleton('Lesswork/Src/Helpers', function (app) {
      const Helpers = require('../Helpers');

      return new Helpers(appRoot);
    });

    fold.Ioc.alias('Adonis/Src/Helpers', 'Lesswork/Src/Helpers');

    fold.Registrar
      .register(providers)
      .then(() => {
        fold.Ioc.aliases(appConfig.aliases);

        if (packageFile.autoload) {
          for (let load in packageFile.autoload) {
            fold.Ioc.autoload(load, path.join(appRoot, packageFile.autoload[load]));
          }
        }

        new Globals().register();

        Helpers.requireIfExists(Helpers.databasePath('factory'));

        Helpers.requireIfExists(path.join(Helpers.configPath(), 'events'));

        callback();
      })
      .catch((error) => {
        if (!error.status || error.status == 500) {
          require('../../lib/error')(error);
        }

        if (typeof response === 'undefined') {
          return;
        }

        use('Event').fire('app.error', error);

        Response.error(use('ErrorTransformer').transform(error), error.status);
      });
  };
};