const Db = require('../db');
const Promise = require('bluebird');

module.exports = function createProcess(processModel, processMetaData) {
  return Db.transaction(async function() {
    const {name, description, actions: actionsMeta, startAction} = processMetaData;

    const dbProcess = await processModel.create({ name, description });

    const dbActions = await createActions(dbProcess, actionsMeta);

    const persistedStartAction = dbActions.find(({ dataValues: { name } }) => name === startAction);
    await dbProcess.update({ startActionId: persistedStartAction.dataValues.id });

    await linkActions(actionsMeta, dbActions);

    return await dbProcess.reload();
  });

  function createActions(dbProcess, actionsMeta) {
    const promises = actionsMeta.map(actionMeta => createAction(dbProcess, actionMeta));

    return Promise.all(promises);
  }

  async function createAction(dbProcess, actionMeta) {
    const { name, description, tasks, type, question } = actionMeta;

    const action = await dbProcess.createAction({
      name,
      description: description || name,
      type,
      question
    });

    if (tasks && tasks.length > 0)
      await Promise.all(tasks.map(taskMeta => createTask(action, taskMeta)));

    return action;
  }

  function createTask(action, taskMeta) {
    const {name, description} = taskMeta;

    return action.createTask({
      name,
      description: description || name
    });
  }

  function linkActions(actionsMeta, createdActions) {
    const promises = actionsMeta.map(actionMeta => {
      const {
        name: metaName,
        nextActions: metaNextActions,
        nextAction: metaNextAction
      } = actionMeta;

      const currentAction = createdActions.find(item => item.dataValues.name === metaName);

      if (metaNextAction && metaNextActions) throw 'nextAction and nextActions, only one of these can be defined';

      if (metaNextActions) {
        const promises = Object.keys(metaNextActions).map((key) => {
          const nextActionName = metaNextActions[key];
          const persistedNextAction = createdActions.find(item => item.dataValues.name === nextActionName);

          return currentAction.createNextAction({
            key,
            nextActionId: persistedNextAction.id
          });
        });

        return Promise.all(promises);
      }
      else if (metaNextAction) {
        const persistedNextAction = createdActions.find((item) => item.dataValues.name === metaNextAction);

        return currentAction.createNextAction({
          nextActionId: persistedNextAction.id
        });
      }
    });

    return Promise.all(promises);
  }
};
