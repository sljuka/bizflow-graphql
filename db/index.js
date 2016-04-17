import Sequelize from 'sequelize';
import _ from 'lodash';
import Faker from 'faker';
import userDefinition from './user';
import postDefinition from './post';

const Conn = new Sequelize(
  'relay',
  'postgres',
  'postgres',
  {
    dialect: 'postgres',
    host: 'localhost'
  }
);

const User = Conn.define('user', userDefinition);
const Post = Conn.define('post', postDefinition);

// Relationships
User.hasMany(Post);
Post.belongsTo(User);

Conn.sync({force: true}).then(() => {
  _.times(10, () => {
    return User.create({
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      email: Faker.internet.email()
    }).then((person) => {
      return person.createPost({
        title: `Sample title by ${person.firstName}`,
        content: 'This is a sample article'
      });
    });
  });
});

export default Conn;
