import Conn from './db';
import _ from 'lodash';
import Faker from 'faker';

_.times(10, () => {
  return Conn.models.user.create({
    firstName: Faker.name.firstName(),
    lastName: Faker.name.lastName(),
    email: Faker.internet.email()
  }).then((person) => {
    return person.createPost({
      title: `Sample title by ${person.firstName}`,
      content: 'This is a sample article'
    });
  }).then(() => process.exit());
});
