'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _post = require('./post');

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = new _graphql.GraphQLObjectType({
  name: 'User',
  description: 'This represents a system user',
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(user) {
          return user.id;
        }
      },
      firstName: {
        type: _graphql.GraphQLString,
        resolve: function resolve(user) {
          return user.firstName;
        }
      },
      lastName: {
        type: _graphql.GraphQLString,
        resolve: function resolve(user) {
          return user.lastName;
        }
      },
      email: {
        type: _graphql.GraphQLString,
        resolve: function resolve(user) {
          return user.email;
        }
      },
      posts: {
        type: new _graphql.GraphQLList(_post2.default),
        resolve: function resolve(user) {
          return user.getPosts();
        }
      }
    };
  }
});

exports.default = User;