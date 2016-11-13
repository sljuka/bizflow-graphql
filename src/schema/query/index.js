const Db = require('../../db');
const graphql = require('graphql');
const Post = require('../post');
const Process = require('../process');
const ProcessInstance = require('../processInstance');
const User = require('../user');

const {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} = graphql;

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
      process: {
        type: Process,
        args: {
          name: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          if (args.name)
            return Db.models.process.findOne({ where: {name: args.name}, group: 'name' });
          else
            throw 'name arg is required';
        }
      },
      processes: {
        type: new GraphQLList(Process),
        args: {
          names: {
            type: new GraphQLList(GraphQLString)
          },
          searchPattern: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          if (args.names)
            return Db.models.process.findAll({
              where: { name: args.names },
              group: 'name',
              limit: 20
            });

          else if (args.searchPattern) {
            const splitNames = args.searchPattern.match(/\S+/g);
            const likeStatements = splitNames.map(name => ({ name: { $like: `%${name.replace(/\s/g, '')}%` } }));

            return Db.models.process.findAll({
              where: { $or: likeStatements },
              order: 'name',
              group: 'name',
              limit: 20
            });
          }
          else
            return Db.models.process.findAll({
              group: 'name',
              limit: 20
            });
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

module.exports = Query;
