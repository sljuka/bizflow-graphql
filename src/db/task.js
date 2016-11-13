const Sequelize = require('sequelize');

module.exports = function(DbConnnection) {
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
};
