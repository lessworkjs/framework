'use strict';

const work = require('@adonisjs/ace');
const commandsPath = require.resolve('lesswork-commands');
const path = require('path');

module.exports = function (appConfig, testing) {
  let Commands = require('require-all')({
    dirname: path.join(commandsPath, '../src/Commands'),
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

  if (testing) {
    return work;
  }

  work.invoke();
};