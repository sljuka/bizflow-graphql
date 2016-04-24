import Sequelize from 'sequelize';

export default function(DbConnnection) {
  return DbConnnection.define('action', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    }
  });
}
