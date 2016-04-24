require('babel-polyfill');

import Db from '../db';
import createProcess from '../services/createProcess';

const processMeta = require('../../processes/sample_process');

const Process = Db.models.process;
createProcess(Process, processMeta).then(() => process.exit());
