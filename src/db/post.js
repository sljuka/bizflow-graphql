import Sequelize from 'sequelize';

export default function(DbConnnection) {
  return DbConnnection.define('post', {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
}
