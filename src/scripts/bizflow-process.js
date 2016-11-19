const Db = require('../db');
const createProcess = require('../services/createProcess');
const { printError, printSuccess } = require('../lib/consoleHelper');

const args = process.argv.slice(2);

async function runTask(args) {
  let processMeta = null;

  try {
    processMeta = require(`../../processes/${args[0]}`);
  } catch(e) {
    printError(`\nFile ${args[0]}.js not found in /processes folder`);
  }

  await createProcess(Db.models.process, processMeta);
  printSuccess('Process created!');
}

runTask(args);
