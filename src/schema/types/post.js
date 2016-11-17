const User = require('./user');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = require('graphql');

const Post = new GraphQLObjectType({
  name: 'Post',
  description: 'This is a Post',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    title: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
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
