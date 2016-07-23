import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql';
import ProcessInstance from './processInstance';

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

export default Process;
