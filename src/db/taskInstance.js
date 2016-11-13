const Sequelize = require('sequelize');

module.exports = function(DbConnnection) {
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
};
