const addUser = require('./addUser');
const addProcessInstance = require('./addProcessInstance.js');
const runInstance = require('./runInstance');
const { GraphQLObjectType } = require('graphql');

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Functions to create stuff',
  fields() {
    return {
      addUser,
      addProcessInstance,
      runInstance
    };
  }
});

module.exports = Mutation;
