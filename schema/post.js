import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql';
import User from './user';

const Post = new GraphQLObjectType({
  name: 'Post',
  description: 'This is a Post',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(post) {
          return post.id;
        }
      },
      title: {
        type: GraphQLString,
        resolve(post) {
          return post.title;
        }
      },
      content: {
        type: GraphQLString,
        resolve(post) {
          return post.content;
        }
      },
      author: {
        type: User,
        resolve(post) {
          return post.getPerson();
        }
      }
    };
  }
});

export default Post;
