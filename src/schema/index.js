const GraphQLSchema = require('graphql').GraphQLSchema;
const Mutation = require('./mutation');
const Query = require('./query');

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

module.exports = Schema;
