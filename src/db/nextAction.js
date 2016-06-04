import Sequelize from 'sequelize';

export default function(DbConnnection) {
  return DbConnnection.define('nextAction', {
    key: {
      type: Sequelize.STRING
    }
  });
}
