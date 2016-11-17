const Db = require('../../db');
const graphql = require('graphql');
const Process = require('../types/process');

const {
  GraphQLString,
  GraphQLList
} = graphql;

module.exports = function processesQuery(dataLoaders) {
  return {
    type: new GraphQLList(Process),
    args: {
      names: {
        type: new GraphQLList(GraphQLString)
      },
      searchPattern: {
        type: GraphQLString
      }
    },
    resolve: async (root, args) => {
      if (args.names)
        return Db.models.process.findAll({
          where: { name: args.names },
          group: 'name',
          limit: 20,
          order: 'name'
        });

      else if (args.searchPattern) {
        const splitNames = args.searchPattern.match(/\S+/g);
        const likeStatements = splitNames.map(name => ({ name: { $like: `%${name.replace(/\s/g, '')}%` } }));

        return Db.models.process.findAll({
          where: { $or: likeStatements },
          group: 'name',
          limit: 20,
          order: 'name'
        });
      }
      else {
        const keys = (await Db.models.process.findAll({ limit: 10, attributes: ['id'], group: 'name' })).map(item => item.dataValues.id);
        return dataLoaders('process').loadMany(keys);
      }
    }
  };
};
