const Db = require('../../db');
const graphql = require('graphql');
const ProcessInstance = require('../types/processInstance');

const {
  GraphQLList,
} = graphql;

module.exports = function postsQuery() {
  return {
    type: new GraphQLList(ProcessInstance),
    resolve(root, args) {
      return Db.models.processInstance.findAll({ where: args });
    }
  };
};
