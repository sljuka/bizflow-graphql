const ProcessInstance = require('./processInstance');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const Process = new GraphQLObjectType({
  name: 'Process',
  description: 'This is a Post',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(pcss) {
          return pcss.id;
        }
      },
      name: {
        type: GraphQLString,
        resolve(pcss) {
          return pcss.name;
        }
      },
      description: {
        type: GraphQLString,
        resolve(pcss) {
          return pcss.description;
        }
      },
      instances: {
        type: new GraphQLList(ProcessInstance),
        resolve(process) {
          return process.getProcessInstances();
        }
      }
    };
  }
});

module.exports = Process;
