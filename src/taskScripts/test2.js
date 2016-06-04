require('babel-polyfill');

import Db from '../db';
import createProcessInstance from '../services/createProcessInstance';

const Process = Db.models.process;
createProcessInstance(Process, 1, 1, 'some more info :)').then(() => process.exit());
