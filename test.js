const loadConfig = require('./index.js');
const { resolve } = require('path');

const exampleConfig = loadConfig.load(resolve(__dirname, 'example.config.js'));

console.log(exampleConfig);
