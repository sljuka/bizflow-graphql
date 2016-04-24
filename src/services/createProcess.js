import Promise from 'bluebird';
import Sequelize from 'sequelize';
import Db from '../db';

export default function createProcess(Process, processMetaData) {

  let createdActions = [];

  return Db.transaction({type: Sequelize.Transaction.EXCLUSIVE}, async function() {
    const {name, description, actions, startAction} = processMetaData;

    const currentProcess = await Process.create({
      name,
      description
    });

    await createActions(currentProcess, actions);

    const persistedStartAction = createdActions.find(item => item.dataValues.name === startAction);
    await currentProcess.update({
      startActionId: persistedStartAction.dataValues.id
    });

    await linkActions(actions, createdActions);
  });

  function createActions(pcss, actionsMeta) {
    const promises = actionsMeta.map(actionMeta => createAction(pcss, actionMeta));

    return Promise.all(promises);
  }

  async function createAction(pcss, actionMeta) {
    const {name, description, tasks, type, question} = actionMeta;

    const action = await pcss.createAction({
      name,
      description: description || name,
      type,
      question
    });

    createdActions.push(action);

    if (!tasks) return Promise.resolve();

    const promises = tasks.map(taskMeta => createTask(action, taskMeta));

    return Promise.all(promises);
  }

  function createTask(action, taskMeta) {
    const {name, description} = taskMeta;

    return action.createTask({
      name,
      description: description || name
    });
  }

  function linkActions(actionsMeta, createdActions) {
    const promises = actionsMeta.map((actionMeta) => {
      const {name, nextActions, nextAction} = actionMeta;

      const currentAction = createdActions.filter((item) => item.dataValues.name === name)[0];

      if (nextAction && nextActions) throw 'nextAction and nextActions, only one of these can be defined';

      if (nextActions) {
        const promises = Object.keys(nextActions).map((key) => {
          const nextActionName = nextActions[key];
          const persistedNextAction = createdActions.filter(item => item.dataValues.name === nextActionName)[0];

          return currentAction.createNextAction({
            key,
            nextActionId: persistedNextAction.dataValues.id
          });
        });

        return Promise.all(promises);
      }

      if (nextAction) {
        const persistedNextAction = createdActions.filter((item) => item.dataValues.name === nextAction)[0];

        return currentAction.createNextAction({
          nextActionId: persistedNextAction.dataValues.id
        });
      }
    });

    return Promise.all(promises);
  }
}
