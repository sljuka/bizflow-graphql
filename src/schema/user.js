const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const User = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a system user',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(user) {
          return user.id;
        }
      },
      firstName: {
        type: GraphQLString,
        resolve(user) {
          return user.firstName;
        }
      },
      lastName: {
        type: GraphQLString,
        resolve(user) {
          return user.lastName;
        }
      },
      email: {
        type: GraphQLString,
        resolve(user) {
          return user.email;
        }
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
