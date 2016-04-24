import Sequelize from 'sequelize';

export default function(DbConnnection) {
  return DbConnnection.define('taskInstance', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    },
    startedAt: {
      type: Sequelize.DATE
    },
    finishedAt: {
      type: Sequelize.DATE
    }
  });
}
