const Db = require('../../db');
const graphql = require('graphql');
const User = require('../types/user');

const {
  GraphQLInt,
  GraphQLList,
} = graphql;

module.exports = function usersQuery() {
  return {
    type: new GraphQLList(User),
    args: {
      id: { type: GraphQLInt },
      ids: { type: new GraphQLList(GraphQLInt) },
      limit: { type: GraphQLInt },
      offset: { type: GraphQLInt }
    },
    resolve: async (root, args, dataLoaders) => {
      const {id, ids, limit, offset} = args;
      let keys = [];

      if (id || ids) {
        keys = keys.concat(id || ids);
      }
      else if (limit && limit < 100) {
        keys = (await Db.models.user.findAll({ limit, offset, attributes: ['id'] })).map(item => item.dataValues.id);
      }
      else {
        keys = (await Db.models.user.findAll({ limit: 10, attributes: ['id'] })).map(item => item.dataValues.id);
      }

      return dataLoaders('user').loadMany(keys);
    }
  };
};
