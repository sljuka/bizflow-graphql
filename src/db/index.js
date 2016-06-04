import Sequelize from 'sequelize';
import defineModels from './defineModels';

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

export default Conn;
