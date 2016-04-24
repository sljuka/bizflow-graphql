import Sequelize from 'sequelize';

export default function(DbConnnection) {
  return DbConnnection.define('actionInstance', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    },
    question: {
      type: Sequelize.STRING
    },
    priority: {
      type: Sequelize.INTEGER
    },
    startedAt: {
      type: Sequelize.DATE
    },
    finishedAt: {
      type: Sequelize.DATE
    }
  });
}
