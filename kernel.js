'use strict';

const fold = require('adonis-fold');

const path = require('path');
const Helpers = require('lesswork-framework/Helpers');

require('./lib/env');

module.exports = function (appRoot) {
  appRoot = path.join(appRoot, '..');
  const app = require(path.join(appRoot, './config/app'));
  const packageFile = require(path.join(appRoot, '/package.json'));

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
            fold.Ioc.autoload(load, path.join(appRoot, packageFile.autoload[load]));
          }
        }

        use('App').registerGlobals();

        const helpers = use('Lesswork/Helpers');

        helpers.requireIfExists(helpers.databasePath('factory'));

        helpers.requireIfExists(helpers.configPath('events'));

        callback();
      })
      .catch((error) => {
        if (!error.status || error.status == 500) {
          const PrettyError = require('pretty-error');

          console.error(new PrettyError().render(error));
        }

        if (typeof response === 'undefined') {
          return;
        }

        use('Event').fire('app.error', error);

        response.failure(use('ErrorTransformer').transform(error), error.status);
      });
  }
};