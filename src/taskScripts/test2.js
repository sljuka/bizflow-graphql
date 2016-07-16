require('babel-polyfill');

import Db from '../db';
import createProcessInstance from '../services/createProcessInstance';


const processModel = Db.models.process;
const userId = 1;
const pcssId = 1;
const additionalInfo = 'More info :)';

createProcessInstance({ processModel, pcssId, userId, additionalInfo }).then(() => process.exit());
