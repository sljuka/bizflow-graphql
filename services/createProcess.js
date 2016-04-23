import Promise from 'bluebird';

export default function createProcess(Process, processMetaData) {
  const {name, description, actions} = processMetaData;

  return Process.create({
    name: name,
    description: description
  })
  .then(pcss => {
    const promises = actions.map(actionMeta => createAction(pcss, actionMeta));

    return Promise.all(promises);
  });
}

function createAction(pcss, actionMeta) {
  const {name, description, tasks} = actionMeta;

  return pcss.createAction({
    name: name,
    description: description
  })
  .then(action => {
    if (!tasks) return Promise.resolve();

    const promises = tasks.map(taskMeta => createTask(action, taskMeta));

    return Promise.all(promises);
  });
}

function createTask(action, taskMeta) {
  const {name, description} = taskMeta;

  return action.createTask({
    name: name,
    description: description
  });
}
