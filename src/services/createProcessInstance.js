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

    for (let i = 0; i < dbActions.length; i++) {
      const {id: actionId, type, name, description} = dbActions[i].dataValues;

      const actionInstance = await dbProcessInstance.createActionInstance({
        actionId,
        type,
        name,
        description
      });
      
      const dbTasks = await dbActions[i].getTasks();
      if (dbTasks.length === 0) continue;

      for (let j = 0; j < dbTasks.length; j++) {
        const { id: taskId, name, description } = dbTasks[j].dataValues;

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
