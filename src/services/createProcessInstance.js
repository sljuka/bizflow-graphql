import Sequelize from 'sequelize';
import Db from '../db';

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

    for (const dbAction of dbActions) {
      const {id: actionId, type, name, description} = dbAction.dataValues;

      const actionInstance = await dbProcessInstance.createActionInstance({
        actionId,
        type,
        name,
        description
      });

      const dbTasks = await dbAction.getTasks();
      if (dbTasks.length === 0) continue;

      for (const dbTask of dbTasks) {
        const { id: taskId, name, description } = dbTask.dataValues;

        await actionInstance.createTaskInstance({
          taskId,
          name,
          description
        });
      }
    }
  });
}

// async function createActionInstance(dbProcessInstance, dbActionMeta) {
//   const {id: actionId, type, name, description} = dbActionMeta.dataValues;
//
//   const actionInstance = await dbProcessInstance.createActionInstance({
//     actionId,
//     type,
//     name,
//     description
//   });
//
//   const dbTasks = await dbActionMeta.getTasks();
//
//   const promises = dbTasks.map(async function(dbTask) {
//     const { id: taskId, name, description } = dbTask.dataValues;
//
//     await actionInstance.createTaskInstance({
//       taskId,
//       name,
//       description
//     });
//   });
//
//   return Promise.all(promises);
// }
