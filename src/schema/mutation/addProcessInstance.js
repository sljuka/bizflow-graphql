import createProcessInstance from '../../services/createProcessInstance';
import Db from '../../db';
import ProcessInstance from '../processInstance';
import {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';

export default {
  type: ProcessInstance,
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
};
