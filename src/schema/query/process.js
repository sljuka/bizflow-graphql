const Db = require('../../db');
const graphql = require('graphql');
const Process = require('../types/user');

const {
  GraphQLString
} = graphql;

module.exports = function processQuery() {
  return {
    type: Process,
    args: {
      name: {
        type: GraphQLString
      }
    },
    resolve(root, args) {
      if (args.name)
        return Db.models.process.findOne({ where: {name: args.name}, group: 'name' });
      else
        throw 'name arg is required';
    }
  };
};
