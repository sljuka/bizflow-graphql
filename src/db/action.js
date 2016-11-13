const Sequelize = require('sequelize');

module.exports = function(DbConnnection) {
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
};
