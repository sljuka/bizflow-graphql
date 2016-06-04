import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql';

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
      }
    };
  }
});

export default Process;
