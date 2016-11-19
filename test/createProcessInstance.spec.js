const assert = require('chai').assert;
const createProcess = require('../src/services/createProcess');
const createProcessInstance = require('../src/services/createProcessInstance');
const Db = require('../src/db');

describe('Create process instance service', function() {
  it('creates processes instance', async () => {
    await Db.sync({force: true});
    // create process
    const processMeta = require('./processes/breakfast_process.json');

    const pcss = await createProcess(Db.models.process, processMeta);
    // TODO: add user creating service
    const user = await Db.models.user.create({ firstName: 'Mare', lastName: 'Maric', email: 'mare@mail.rs' });

    // check that there are no process instances
    assert.equal((await Db.models.processInstance.findAll()).length, 0);

    // create process instance
    await createProcessInstance({
      processModel: Db.models.process,
      processId: pcss.id,
      userId: user.id,
      additionalInfo: 'sample instance'
    });

    const processInstance = await Db.models.processInstance.find({
      where: { id: 1 },
      include: {
        model: Db.models.actionInstance,
        as: 'startActionInstance'
      }
    });

    // check process instance data
    const { name, additionalInfo } = processInstance.dataValues;
    assert.equal(name, 'Breakfast process');
    assert.equal(additionalInfo, 'sample instance');

    // check action instances
    const dbActionInstances = await processInstance.getActionInstances();
    const testInstances = dbActionInstances.map(({dataValues: { id, name, actionId }}) => ({ id, name, actionId }));

    assert.deepEqual(testInstances, [
      { id: 1, name: 'Check supplies', actionId: 1 },
      { id: 2, name: 'Get supplies', actionId: 2 },
      { id: 3, name: 'Make breakfast', actionId: 3 },
      { id: 4, name: 'Serve breakfast', actionId: 4 }
    ]);

    // check start action instance
    assert.equal(processInstance.startActionInstance.dataValues.id, 1);

    // check if action instances are linked (nextActionInstances)
    const dbNextActionInstances = await Promise.all(dbActionInstances.map(dbActionInstance =>
      dbActionInstance.getNextActionInstances()
    ));

    // note: action can have more nextActions
    const testNextActionInstances = dbNextActionInstances.map(dbNextActionInstance =>
      dbNextActionInstance.map(({ dataValues }) => {
        const { actionInstanceId, nextActionInstanceId, key } = dataValues;
        return { actionInstanceId, nextActionInstanceId, key };
      })
    );

    assert.deepEqual(testNextActionInstances, [
      [{ actionInstanceId: 1, nextActionInstanceId: 2, key: 'notEnaughSupplies' }, { actionInstanceId: 1, nextActionInstanceId: 3, key: 'enaughSupplies' }],
      [{ actionInstanceId: 2, nextActionInstanceId: 3, key: null }],
      [{ actionInstanceId: 3, nextActionInstanceId: 4, key: null }],
      []
    ]);
  });
});
