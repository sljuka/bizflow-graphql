import colors from 'colors';

export function printError(message) {
  console.log(colors.red('\nErrr:'), colors.red(message), '\n'); // eslint-disable-line no-console
}

export function printSuccess(message) {
  console.log(colors.green('\nHOORA:'), colors.green(message), '\n'); // eslint-disable-line no-console
}
