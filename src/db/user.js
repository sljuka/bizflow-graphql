const Sequelize = require('sequelize');

module.exports = function(Conn) {
  return Conn.define('user', {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    openedProcesses: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });
};
