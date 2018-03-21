const {
  Command
} = require('lesswork-cmd');

const ejs = require('ejs');
const fs = require('fs');

class BaseCommand extends Command {
  run(command) {
    const exec = require('child_process').exec;
    const child = exec(command,
      (error, stdout, stderr) => {
        console.log(stdout);

        if (stderr) {
          console.log(`Error: ${stderr}`);
        }

        if (error !== null) {
          console.log(`Error: ${error}`);
        }
      });
  }

  ejsToFile(template, destination, options) {
    ejs.renderFile(__dirname + `/../../Generators/templates/${template}.tpl`, options, function (err, data) {
      try {
        fs.writeFile(destination, data, 'utf8');
      } catch (err) {
        if (err) {
          throw err;
        }
      }
    });

    return this;
  }
}

module.exports = BaseCommand;