'use strict';

const work = require('lesswork-cmd');
require('../../lib/env');

module.exports = function (appConfig) {
  let Commands = require('require-all')({
    dirname: __dirname + '/../Console/Commands',
    recursive: true,
    excludeDirs: /^BaseCommand$/,
  });

  Commands = Object.assign({}, Commands.Console, Commands.Make);

  const AppCommands = appConfig.commands;

  Object.keys(Commands).forEach((name) => {
    work.addCommand(Commands[name]);
  });

  Object.keys(AppCommands).forEach((name) => {
    work.addCommand(require(AppCommands[name]));
  });

  work.onError(function (error) {
    require('../../lib/error')(error);
    process.exit(1);
  });

  work.wireUpWithCommander();

  work.invoke();
};