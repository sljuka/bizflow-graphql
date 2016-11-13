const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = require('graphql');
const User = require('./user');

const Post = new GraphQLObjectType({
  name: 'Post',
  description: 'This is a Post',
  fields: () => ({
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
  })
});

module.exports = Post;
