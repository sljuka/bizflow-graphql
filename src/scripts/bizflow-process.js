const Db = require('../db');
const createProcess = require('../services/createProcess');
const { printError, printSuccess } = require('../lib/consoleHelper');

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
