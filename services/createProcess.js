import Promise from 'bluebird';

export default function createProcess(Process, processMetaData) {
  const {name, description} = processMetaData;

  return Process.create({
    name: name,
    description: description
  })
  .then(pcss => {
    const promises = processMetaData.actions.map((actionItem) => {
      const {name, description, tasks} = actionItem;

      return pcss.createAction({
        name: name,
        description: description
      })
      .then(action => {
        if (!tasks) return Promise.resolve();

        const promisesbre = tasks.map(taskItem => {
          const {name, description} = taskItem;

          return action.createTask({
            name: name,
            description: description
          });
        });

        return Promise.all(promisesbre);
      });
    });

    return Promise.all(promises);
  });
}
