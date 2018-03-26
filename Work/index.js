'use strict';

module.exports = function (app) {
  const work = require('../../../../work');

  const Commands = require('../Console');

  const AppCommands = app.commands;

  Object.keys(Commands).forEach((name) => {
    work.addCommand(Commands[name]);
  });

  Object.keys(AppCommands).forEach((name) => {
    work.addCommand(require(AppCommands[name]));
  });

  work.onError(function (error, commandName) {
    const PrettyError = require('pretty-error');

    console.error(new PrettyError().render(error));

    process.exit(1);
  });

  work.wireUpWithCommander();

  work.invoke();
};