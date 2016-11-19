const Db = require('../db');
const Promise = require('bluebird');

module.exports = function createProcessInstance({ processModel, processId, userId, additionalInfo }) {
  return Db.transaction(async function() {
    const dbProcess = await processModel.findOne({
      where: { id: processId },
      include: [
        Db.models.action,
        {
          model: Db.models.action,
          as: 'startAction'
        }
      ]
    });
    const {name, description, startAction} = dbProcess.dataValues;
    const dbProcessInstance = await dbProcess.createProcessInstance({
      name,
      description,
      additionalInfo,
      creatorId: userId
    });

    const dbActions = dbProcess.actions;

    const dbActionInstances = await createActionInstances(dbProcessInstance, dbActions, startAction.dataValues.id);

    await linkActionInstances(dbActionInstances);

    return await dbProcessInstance.reload();
  });
};

function createActionInstances(dbProcessInstance, actions, startActionId) {
  return Promise.all(actions.map(async function(dbAction) {
    const {id: actionId, type, name, description} = dbAction.dataValues;

    const dbActionInstance = await dbProcessInstance.createActionInstance({
      actionId,
      type,
      name,
      description
    });

    if (actionId === startActionId)
      await dbProcessInstance.update({ startActionInstanceId: dbActionInstance.dataValues.id });

    return dbActionInstance;
  }));
}

function linkActionInstances(dbActionInstances) {
  return Promise.all(dbActionInstances.map(async (dbActionInstance) => {
    const dbAction = await dbActionInstance.getAction({
      include: {
        model: Db.models.nextAction,
        include: {
          model: Db.models.action,
          as: 'nextAction'
        }
      }
    });
    const dbNextActions = dbAction.nextActions;

    await Promise.all(dbNextActions.map(dbNextAction => {
      const { key } = dbNextAction.dataValues;
      const nextAction = dbNextAction.nextAction;

      const nextActionId = nextAction.dataValues.id;
      const nextActionInstance = dbActionInstances.find(({ dataValues: { actionId } }) => nextActionId === actionId);

      return dbActionInstance.createNextActionInstance({
        key,
        nextActionInstanceId: nextActionInstance.dataValues.id
      });
    }));
  }));
}
