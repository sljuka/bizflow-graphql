const Db = require('../db');

module.exports = function runInstance({ processInstanceModel, processInstanceId }) {
  return Db.transaction(async function() {
    const processInstance = await processInstanceModel.findById(processInstanceId);
    const currentDate = Date.now();

    const actionHead = await processInstance.createActionHead({
      actionInstanceId: processInstance.startActionInstanceId
    });

    await processInstance.update({ startedAt: currentDate });

    const actionInstance = await actionHead.getActionInstance();
    await actionInstance.update({ startedAt: currentDate });

    return processInstance;
  });
};
