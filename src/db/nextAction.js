const Sequelize = require('sequelize');

module.exports = function(DbConnnection) {
  return DbConnnection.define('nextAction', {
    key: {
      type: Sequelize.STRING
    }
  });
};
