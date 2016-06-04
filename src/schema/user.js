import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql';
import Post from './post';

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
      posts: {
        type: new GraphQLList(Post),
        resolve(user) {
          return user.getPosts();
        }
      }
    };
  }
});

export default User;
