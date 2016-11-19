const Sequelize = require('sequelize');
const defineModels = require('./defineModels');

const env = process.env.NODE_ENV;

// SQLITE SETTINGS
const Conn = new Sequelize(
  'relay',
  'postgres',
  'postgres',
  {
    dialect: 'sqlite',
    host: 'localhost',
    storage: `${__dirname}/database-${env}.sqlite`,
    logging: false
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
