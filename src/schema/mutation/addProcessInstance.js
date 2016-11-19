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
    processId: {
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
    const { processId, userId, additionalInfo } = args;
    const processModel = Db.models.process;

    return createProcessInstance({ processModel, processId, userId, additionalInfo });
  }
};
