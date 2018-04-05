const fold = require('@adonisjs/fold');
const path = require('path');
const Globals = require('../Globals');

require('../../lib/env');

module.exports = (appRoot) => {
  const appConfig = require(path.join(appRoot, './config/app'));
  const packageFile = require(path.join(appRoot, '/package.json'));

  return async (callback, providers) => {
    providers = providers || appConfig.providers;

    fold.resolver.appNamespace('App');

    fold.ioc.singleton('Lesswork/Src/Helpers', () => {
      const Helpers = require('../Helpers');

      return new Helpers(appRoot);
    });

    fold.ioc.alias('Lesswork/Src/Helpers', 'Helpers');

    fold.registrar.providers(providers).register();

    await fold.registrar.boot();

    Object.keys(appConfig.aliases).forEach((alias) => {
      fold.ioc.alias(appConfig.aliases[alias], alias);
    });

    if (packageFile.autoload) {
      for (const load in packageFile.autoload) {
        if (packageFile.autoload[load]) {
          fold.ioc.autoload(path.join(appRoot, packageFile.autoload[load]), load);
        }
      }
    }

    new Globals().register();

    Helpers.requireIfExists(Helpers.databasePath('factory'));

    Helpers.requireIfExists(path.join(Helpers.configPath(), 'events'));

    callback();
  };
};