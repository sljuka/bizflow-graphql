const Db = require('../../db');
const graphql = require('graphql');
const Post = require('../types/post');

const {
  GraphQLList,
} = graphql;

module.exports = function postsQuery() {
  return {
    type: new GraphQLList(Post),
    resolve(root, args) {
      return Db.models.post.findAll({ where: args });
    }
  };
};
