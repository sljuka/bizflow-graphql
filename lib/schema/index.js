'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _post = require('./post');

var _post2 = _interopRequireDefault(_post);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Query = new _graphql.GraphQLObjectType({
  name: 'Query',
  description: 'This is root query',
  fields: function fields() {
    return {
      users: {
        type: new _graphql.GraphQLList(_user2.default),
        args: {
          id: {
            type: _graphql.GraphQLInt
          },
          email: {
            type: _graphql.GraphQLString
          }
        },
        resolve: function resolve(root, args) {
          return _db2.default.models.user.findAll({ where: args });
        }
      },
      posts: {
        type: new _graphql.GraphQLList(_post2.default),
        resolve: function resolve(root, args) {
          return _db2.default.models.post.findAll({ where: args });
        }
      }
    };
  }
});

var Mutation = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  description: 'Functions to create stuff',
  fields: function fields() {
    return {
      addPerson: {
        type: _user2.default,
        args: {
          firstName: {
            type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
          },
          lastName: {
            type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
          },
          email: {
            type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
          }
        },
        resolve: function resolve(_, args) {
          return _db2.default.models.user.create({
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email
          });
        }
      }
    };
  }
});

var Schema = new _graphql.GraphQLSchema({
  query: Query,
  mutation: Mutation
});

exports.default = Schema;