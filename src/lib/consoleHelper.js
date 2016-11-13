const colors = require('colors');

module.exports.printError = function printError(message) {
  console.log(colors.red(`\nErrr: ${message}\n`)); // eslint-disable-line no-console
};

module.exports.printSuccess = function printSuccess(message) {
  console.log(colors.green(`\nHOORA: ${message}\n`)); // eslint-disable-line no-console
};
