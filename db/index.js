import Sequelize from 'sequelize';
import defineModels from './defineModels';

const Conn = new Sequelize(
  'relay',
  'postgres',
  'postgres',
  {
    dialect: 'postgres',
    host: 'localhost'
  }
);

defineModels(Conn);

// Conn.sync({force: true});

export default Conn;
