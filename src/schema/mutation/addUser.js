const Db = require('../../db');
const User = require('../user');
const {
  GraphQLString,
  GraphQLNonNull
} = require('graphql');

module.exports = {
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
