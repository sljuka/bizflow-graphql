require('babel-polyfill');

import Db from '../db';
import createProcess from '../services/createProcess';
import { printError, printSuccess } from '../lib/consoleHelper';

const args = process.argv.slice(2);

try {
  const processMeta = require(`../../processes/${args[0]}`);
  runTask(args, processMeta);
} catch(e) {
  printError(`\nFile ${args[0]}.js not found in /processes folder`);
}

async function runTask(args, processMeta) {
  const Process = Db.models.process;
  await createProcess(Process, processMeta);
  printSuccess('Process created!');
}
