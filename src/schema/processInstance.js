import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql';

const ProcessInstance = new GraphQLObjectType({
  name: 'ProcessInstance',
  description: 'This is a process instance',
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
      additionalInfo: {
        type: GraphQLString,
        resolve(pcss) {
          return pcss.additionalInfo;
        }
      }
    };
  }
});

export default ProcessInstance;
