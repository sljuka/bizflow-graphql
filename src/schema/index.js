import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from 'graphql';
import Db from '../db';
import Post from './post';
import User from './user';
import Process from './process';
import createProcessInstance from '../services/createProcessInstance';

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is root query',
  fields: () => {
    return {
      users: {
        type: new GraphQLList(User),
        args: {
          id: {
            type: GraphQLInt
          },
          email: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          return Db.models.user.findAll({ where: args });
        }
      },
      posts: {
        type: new GraphQLList(Post),
        resolve(root, args) {
          return Db.models.post.findAll({ where: args });
        }
      },
      processes: {
        type: new GraphQLList(Process),
        resolve(root, args) {
          return Db.models.post.findAll({ where: args });
        }
      }
    };
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Functions to create stuff',
  fields() {
    return {
      addPerson: {
        type: User,
        args: {
          firstName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          lastName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(_, args) {
          return Db.models.user.create({
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email
          });
        }
      },
      addProcessInstance: {
        type: User,
        args: {
          pcssId: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          userId: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          additionalInfo: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(_, args) {
          const { pcssId, userId, additionalInfo } = args;
          const processModel = Db.models.process;

          return createProcessInstance({ processModel, pcssId, userId, additionalInfo });
        }
      }
    };
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
