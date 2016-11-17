const createProcessInstance = require('../../services/createProcessInstance');
const Db = require('../../db');
const ProcessInstance = require('../types/processInstance');
const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql');

module.exports = {
  type: ProcessInstance,
  args: {
    pcssId: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    userId: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    additionalInfo: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(_, args) {
    const { pcssId, userId, additionalInfo } = args;
    const processModel = Db.models.process;

    return createProcessInstance({ processModel, pcssId, userId, additionalInfo });
  }
};
