const DataLoader = require('dataloader');
const Db = require('../../db');


/* Lazy data loading */
module.exports = () => {
  const loadedDataLoaders = {};

  const dataLoaders = {
    user: () => {
      return new DataLoader(keys =>
        Db.models.user.findAll({ where: { id: keys } })
      );
    },
    process: () => {
      return new DataLoader(keys =>
        Db.models.process.findAll({
          where: { id: keys },
          limit: 20,
          group: 'name'
        })
      );
    },
    /* processInstance loader is only used to batch process instances (cache: false),
       for cashing I could combine it with instanceLoader, but there is no need for now
    */
    processInstance: () => {
      return new DataLoader(keys => {
        return Db.models.processInstance.findAll({
          where: { processId: keys }
        }).then(dbResults => {
          const instances = dbResults.map(({dataValues}) => dataValues);

          return keys.map(item => instances.filter(instance => instance.processId === item));
        });
      }, { cache: false });
    },
    instance: () => {
      return new DataLoader(keys =>
        Db.models.processInstance.findAll({
          where: { id: keys }
        })
      );
    }
  };

  const getDataLoader = (name) => {
    if (!loadedDataLoaders[name]) {
      if (!dataLoaders[name]) throw `Data loader with name ${name} does not exist`;

      loadedDataLoaders[name] = dataLoaders[name]();
      console.log(`INIT::: ${name} data loader`);
    }

    return loadedDataLoaders[name];
  };

  return getDataLoader;
};
