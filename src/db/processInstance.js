import Sequelize from 'sequelize';

export default function(DbConnnection) {
  return DbConnnection.define('processInstance', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    },
    additionalInfo: {
      type: Sequelize.STRING
    },
    startedAt: {
      type: Sequelize.DATE
    },
    finishedAt: {
      type: Sequelize.DATE
    },
    startActionInstanceId: {
      type: Sequelize.INTEGER
    }
  });
}
