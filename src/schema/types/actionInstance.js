const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = require('graphql');

const ActionInstance = new GraphQLObjectType({
  name: 'ActionInstance',
  description: 'This is a process action instance',
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
      }
    };
  }
});

module.exports = ActionInstance;
