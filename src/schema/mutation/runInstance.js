import runInstance from '../../services/runInstance';
import Db from '../../db';
import ProcessInstance from '../processInstance';
import {
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';

export default {
  type: ProcessInstance,
  args: {
    processInstanceId: { type: new GraphQLNonNull(GraphQLInt) }
  },
  resolve(_, args) {
    const { processInstanceId } = args;
    const processInstanceModel = Db.models.processInstance;

    return runInstance({ processInstanceModel, processInstanceId });
  }
};
