const {
  Command
} = require('lesswork-cmd');

const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

class BaseCommand extends Command {
  checkIfExists(file) {
    if (typeof file === 'object') {
      let results = false;
      file.forEach((check) => {
        if (fs.existsSync(check)) {
          results = true;
          return;
        }
      });
      return results;
    }
    return fs.existsSync(file);
  }

  mkdir(dir) {
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    } catch (e) {}
  }

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