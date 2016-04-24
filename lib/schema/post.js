'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Post = new _graphql.GraphQLObjectType({
  name: 'Post',
  description: 'This is a Post',
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(post) {
          return post.id;
        }
      },
      title: {
        type: _graphql.GraphQLString,
        resolve: function resolve(post) {
          return post.title;
        }
      },
      content: {
        type: _graphql.GraphQLString,
        resolve: function resolve(post) {
          return post.content;
        }
      },
      author: {
        type: _user2.default,
        resolve: function resolve(post) {
          return post.getPerson();
        }
      }
    };
  }
});

exports.default = Post;