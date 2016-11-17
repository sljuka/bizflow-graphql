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
        type: GraphQLInt
      },
      name: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
      instances: {
        type: new GraphQLList(ProcessInstance),
        resolve(pcss, args, loaders) {
          return loaders('processInstance').load(pcss.id);
        }
      }
    };
  }
});

module.exports = Process;
