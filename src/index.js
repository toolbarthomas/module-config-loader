import { existsSync } from 'fs';
import { extname, resolve } from 'path';
import validFilename from 'valid-filename';

export const load = async (filename, ...args) =>
  new Promise((accept, reject) => {
    if (!existsSync(filename) && !validFilename(filename)) {
      throw new Error(`${filename} does not exists.`);
    }

    // Throw an exception if the filename is not a javascript file.
    if (
      extname(filename) &&
      ['.js', '.cjs', '.ejs'].includes(extname(filename) === false)
    ) {
      throw new Error(
        'The javascript extension is only supported when using absolute paths...',
      );
    }

    const configPath = existsSync(filename) ? resolve(filename) : filename;

    // Try to parse the defined configuration file.
    try {
      import(configPath).then((m) => {
        if (m.default) {
          accept(typeof m.default === 'function' ? m.default(args) : m.default);
        }
      });
    } catch (err) {
      reject(err);
    }
  });

export default {
  load,
};
