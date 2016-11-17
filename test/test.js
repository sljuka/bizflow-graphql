const assert = require('chai').assert;
const createProcess = require('../src/services/createProcess');
const Db = require('../src/db');

describe('Bizflow service', function() {
  it('creates processes', async () => {
    const Process = Db.models.process;
    const processMeta = require('./processes/breakfast_process.json');

    await createProcess(Process, processMeta);

    const process = await Process.find({ where: { id: 1 } });
    const actions = (await process.getActions()).map(item => {
      const { id, name, processId } = item.dataValues;
      return { id, name, processId };
    });

    assert.equal(process.dataValues.name, 'Breakfast process');
    assert.deepEqual(actions, [
      { id: 1, name: 'Check supplies', processId: 1 },
      { id: 2, name: 'Get supplies', processId: 1 },
      { id: 3, name: 'Make breakfast', processId: 1 },
      { id: 4, name: 'Serve breakfast', processId: 1 }
    ]);
  });
});
