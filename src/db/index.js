const Sequelize = require('sequelize');
const defineModels = require('./defineModels');

// SQLITE SETTINGS
const Conn = new Sequelize(
  'relay',
  'postgres',
  'postgres',
  {
    dialect: 'sqlite',
    host: 'localhost',
    storage: `${__dirname}/database.sqlite`
  }
);

// POSTGRESS SETTINGS
// const Conn = new Sequelize(
//   'relay',
//   'postgres',
//   'postgres',
//   {
//     dialect: 'postgres',
//     host: 'localhost'
//   }
// );

defineModels(Conn);

module.exports = Conn;
