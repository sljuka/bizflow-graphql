import Sequelize from 'sequelize';

export default function(DbConnnection) {
  return DbConnnection.define('task', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    },
    autoAssign: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });
}
