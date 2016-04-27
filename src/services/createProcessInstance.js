import Sequelize from 'sequelize';
import Db from '../db';
import Promise from 'bluebird';

export default function createProcessInstance(Process, pcssId, userId, additionalInfo) {
  return Db.transaction({type: Sequelize.Transaction.EXCLUSIVE}, async function() {

    const dbProcess = await Process.findById(pcssId);
    const {name, description} = dbProcess.dataValues;

    const dbProcessInstance = await dbProcess.createProcessInstance({
      name,
      description,
      additionalInfo,
      creatorId: userId
    });

    const dbActions = await dbProcess.getActions();

    const actionPromises = dbActions.map(async function(dbAction) {
      const {id: actionId, type, name, description} = dbAction.dataValues;

      const dbActionInstance = await dbProcessInstance.createActionInstance({
        actionId,
        type,
        name,
        description
      });

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

    await Promise.all(actionPromises);
  });
}
