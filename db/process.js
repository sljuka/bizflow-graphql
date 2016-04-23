import Sequelize from 'sequelize';

export default function(DbConnnection) {
  return DbConnnection.define('process', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    }
  });
}
