import addUser from './addUser';
import addProcessInstance from './addProcessInstance.js';
import runInstance from './runInstance';
import { GraphQLObjectType } from 'graphql';

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

export default Mutation;
