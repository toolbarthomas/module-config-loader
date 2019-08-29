const { existsSync } = require('fs');
const { extname, resolve } = require('path');
const validFilename = require('valid-filename');

module.exports = {
  load(filename, relative) {
    if (!existsSync(filename) && !validFilename(filename)) {
      throw new Error(`${filename} does not exists.`);
    }

    // Throw an exception if the filename is not a javascript file.
    if (extname(filename) !== '.js') {
      throw new Error('The defined filename is not a valid javascript file.');
    }

    console.log(existsSync(filename));

    const configPath = existsSync(filename)
      ? resolve(filename)
      : resolve(process.cwd(), filename);

    console.log(configPath);

    // The options Object to return.
    let options = {};

    // Try to parse the defined configuration file.
    if (existsSync(configPath)) {
      try {
        options = require(configPath);
      } catch (err) {
        throw new Error(err);
      }
    }

    return options;
  },
};
