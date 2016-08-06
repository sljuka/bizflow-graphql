import Db from '../db';
import Promise from 'bluebird';

export default function createProcessInstance({ processModel, pcssId, userId, additionalInfo }) {
  return Db.transaction(async function() {

    const dbProcess = await processModel.findById(pcssId);
    const {name, description, startActionId} = dbProcess.dataValues;

    const dbProcessInstance = await dbProcess.createProcessInstance({
      name,
      description,
      additionalInfo,
      creatorId: userId
    });

    const dbActions = await dbProcess.getActions();

    await createActionInstances(dbProcessInstance, dbActions, startActionId);

    // next actions...

    return dbProcessInstance;
  });
}

function createActionInstances(processInstance, actions, startActionId) {
  const actionPromises = actions.map(async function(dbAction) {
    const {id: actionId, type, name, description} = dbAction.dataValues;

    const dbActionInstance = await processInstance.createActionInstance({
      actionId,
      type,
      name,
      description
    });

    if (actionId === startActionId)
      await processInstance.update({ startActionInstanceId: dbActionInstance.id });

    const dbTasks = await dbAction.getTasks();
    const taskPromises = dbTasks.map(async function(dbTask) {
      const { id: taskId, name, description } = dbTask.dataValues;

      await dbActionInstance.createTaskInstance({
        taskId,
        name,
        description
      });
    });

    await Promise.all(taskPromises);
  });

  return Promise.all(actionPromises);
}
