import addUser from './addUser';
import addProcessInstance from './addProcessInstance.js';
import { GraphQLObjectType } from 'graphql';

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Functions to create stuff',
  fields() {
    return {
      addUser,
      addProcessInstance
    };
  }
});

export default Mutation;
