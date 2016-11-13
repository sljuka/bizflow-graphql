const Sequelize = require('sequelize');

module.exports = function(DbConnnection) {
  return DbConnnection.define('process', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    },
    startActionId: {
      type: Sequelize.INTEGER
    }
  });
};
