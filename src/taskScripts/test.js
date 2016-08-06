import Db from '../db';

const ProcessInstance = Db.models.processInstance;

const sss = () =>
  Db.transaction(async function() {
    const pi = await ProcessInstance.findById(1);
    const saa = await pi.getActionInstances({
      where: { id: 1 }
    });
  });

sss();
