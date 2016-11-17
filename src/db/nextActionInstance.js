const Sequelize = require('sequelize');

module.exports = function(DbConnnection) {
  return DbConnnection.define('nextActionInstance', {
    key: {
      type: Sequelize.STRING
    }
  });
};
