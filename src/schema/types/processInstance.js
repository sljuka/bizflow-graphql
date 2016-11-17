const ActionInstance = require('./actionInstance');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const ProcessInstance = new GraphQLObjectType({
  name: 'ProcessInstance',
  description: 'This is a process instance',
  fields: () => {
    return {
      id: {
        type: GraphQLInt
      },
      name: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
      additionalInfo: {
        type: GraphQLString
      },
      startedAt: {
        type: GraphQLString
      },
      actionInstances: {
        type: new GraphQLList(ActionInstance),
        resolve(pcss) {
          return pcss.getActionInstances();
        }
      },
      process: {
        type: require('./process'),
        resolve(actionInstance, _args, dataLoaders) {
          return dataLoaders('process').load(actionInstance.processId);
        }
      }
    };
  }
});

module.exports = ProcessInstance;
