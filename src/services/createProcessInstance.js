import Sequelize from 'sequelize';
import Db from '../db';

export default function createProcessInstance(Process, processId, userId, additionalInfo) {
  return Db.transaction({type: Sequelize.Transaction.EXCLUSIVE}, async function() {

    const pcss = await Process.findById(processId);
    const user = await Db.models.user.findById(userId);

    const {id: processId, name, description} = pcss.dataValues;

    const processInstance = await user.createProcessInstance({
      processId,
      name,
      description,
      additionalInfo
    });

    processInstance;

  });
}
