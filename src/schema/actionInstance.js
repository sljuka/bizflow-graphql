import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql';

const ActionInstance = new GraphQLObjectType({
  name: 'ActionInstance',
  description: 'This is a process action instance',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(actionInstance) {
          return actionInstance.id;
        }
      },
      name: {
        type: GraphQLString,
        resolve(actionInstance) {
          return actionInstance.name;
        }
      },
      description: {
        type: GraphQLString,
        resolve(actionInstance) {
          return actionInstance.description;
        }
      }
    };
  }
});

export default ActionInstance;