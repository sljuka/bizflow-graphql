import Db from '../../db';
import User from '../user';
import {
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

export default {
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
};
