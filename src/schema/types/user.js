const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const User = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a user',
  fields: () => {
    return {
      id: {
        type: GraphQLInt
      },
      firstName: {
        type: GraphQLString
      },
      lastName: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      openedProcesses: {
        type: GraphQLString,
        resolve(user) {
          return user.openedProcesses;
        }
      },
      posts: {
        type: new GraphQLList(require('./post')),
        resolve(user) {
          return user.getPosts();
        }
      }
    };
  }
});

module.exports = User;
