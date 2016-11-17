const graphql = require('graphql');
const postsQuery = require('./posts');
const processesQuery = require('./processes');
const processQuery = require('./process');
const instanceQuery = require('./instances');
const usersQuery = require('./users');

const { GraphQLObjectType } = graphql;

const Query = new GraphQLObjectType({
  name: 'RootQuery',
  description: '...:::rooT Query:::...',
  fields: () => {
    return {
      users: usersQuery(),
      posts: postsQuery(),
      process: processQuery(),
      processes: processesQuery(),
      instances: instanceQuery()
    };
  }
});

module.exports = Query;
