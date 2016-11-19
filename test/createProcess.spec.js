const assert = require('chai').assert;
const createProcess = require('../src/services/createProcess');
const Db = require('../src/db');

describe('Create process service', function() {
  it('creates processes', async () => {
    // clear database
    await Db.sync({force: true});

    // prepare test process
    const processMeta = require('./processes/breakfast_process.json');
    await createProcess(Db.models.process, processMeta);
    const process = await Db.models.process.find({ where: { id: 1 } });

    const {
      description: processDescription,
      name: processName,
      startActionId: processStartActionId
    } = process.dataValues;

    // Check process data
    assert.equal(processName, 'Breakfast process');
    assert.equal(processDescription, 'This is a sample process');

    // Check actions
    const rawActions = await process.getActions();
    const actions = rawActions.map(item => {
      const { id, name, processId } = item.dataValues;
      return { id, name, processId };
    });

    // Check if all actions are created
    assert.deepEqual(actions, [
      { id: 1, name: 'Check supplies', processId: 1 },
      { id: 2, name: 'Get supplies', processId: 1 },
      { id: 3, name: 'Make breakfast', processId: 1 },
      { id: 4, name: 'Serve breakfast', processId: 1 }
    ]);

    // Check if startAction is set
    assert.equal(processStartActionId, 1);

    // Check if nextActions are set
    const nextActions = await Db.models.nextAction.findAll()
      .map(({ dataValues: { actionId, nextActionId } }) => ({ actionId, nextActionId }));

    assert.deepEqual(nextActions, [
      { actionId: 1, nextActionId: 2 },
      { actionId: 1, nextActionId: 3 },
      { actionId: 2, nextActionId: 3 },
      { actionId: 3, nextActionId: 4 }
    ]);

    // check if tasks are created
    const dbTasks = await Db.models.task.findAll();
    const testTasks = dbTasks.map(({ dataValues: { name, actionId } }) => (
      { name, actionId }
    ));

    assert.deepEqual(testTasks, [
      { actionId: 2, name: 'Get bacon' },
      { actionId: 2, name: 'Get eggs' },
      { actionId: 2, name: 'Get bread' },
      { actionId: 3, name: 'Make breakfast' },
      { actionId: 4, name: 'Prepare table' },
      { actionId: 4, name: 'Slice bread' }
    ]);
  });
});
