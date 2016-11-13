const Db = require('../../db');
const ProcessInstance = require('../processInstance');
const runInstance = require('../../services/runInstance');
const {
  GraphQLInt,
  GraphQLNonNull
} = require('graphql');

module.exports = {
  type: ProcessInstance,
  args: {
    processInstanceId: { type: new GraphQLNonNull(GraphQLInt) }
  },
  resolve(_, args) {
    const { processInstanceId } = args;
    const processInstanceModel = Db.models.processInstance;

    return runInstance({ processInstanceModel, processInstanceId });
  }
};
