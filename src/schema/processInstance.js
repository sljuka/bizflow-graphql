import ActionInstance from './actionInstance';
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
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
      },
      actionInstances: {
        type: new GraphQLList(ActionInstance),
        resolve(pcss) {
          return pcss.getActionInstances();
        }
      },
      startedAt: {
        type: GraphQLString,
        resolve(pcss) {
          return pcss.startedAt;
        }
      }
    };
  }
});

export default ProcessInstance;
