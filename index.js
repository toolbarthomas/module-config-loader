const fs = require('fs');
const path = require('path');
const validFilename = require('valid-filename');

module.exports = {
  load(filename) {
    if (!validFilename(filename)) {
      throw new Error('The given file is not a valid filename');
    }

    const extname = path.extname(filename);

    // Throw an exception if the filename is not a javascript file.
    if (extname !== '.js') {
      throw new Error('The defined filename is not a valid javascript file.');
    }

    const cwd = process.cwd();
    const configPath = path.resolve(cwd, filename);

    // The options Object to return.
    let options = {};

    // Try to parse the defined configuration file.
    if (fs.existsSync(configPath)) {
      try {
        options = require(configPath);
      } catch (err) {
        throw new Error(err);
      }
    }

    return options;
  },
};
