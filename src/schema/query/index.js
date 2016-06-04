import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList
} from 'graphql';
import Db from '../../db';
import Post from '../post';
import User from '../user';
import Process from '../process';
import ProcessInstance from '../processInstance';

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
          return Db.models.process.findAll({ where: args });
        }
      },
      processInstances: {
        type: new GraphQLList(ProcessInstance),
        resolve(root, args) {
          return Db.models.processInstance.findAll({ where: args });
        }
      }
    };
  }
});

export default Query;
