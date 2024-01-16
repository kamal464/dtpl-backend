// const mysql = require("mysql2/promise");

// const mqsqlConnection = async () => {
//   return await mysql.createConnection({
//     host: process.env.DB_IP,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//   });
// };
// module.exports = {
//   mqsqlConnection,
// };



const { Sequelize } = require('sequelize');

const sequelizeConnection = new Sequelize(
  process.env.DB_NAME || 'emkit',
  process.env.DB_USER || 'kasturi',
  process.env.DB_PASSWORD || 'opentools',
  {
    host: process.env.DB_IP || '183.82.116.4',
    // host: process.env.DB_IP || '192.168.0.5',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: console.log, // Enable logging for detailed information
    // Add additional options as needed
  }
);

const testSequelizeConnection = async () => {
  try {
    await sequelizeConnection.authenticate();
    console.log('Sequelize connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database using Sequelize:', error);
    throw error;
  }
};

module.exports = {
  sequelizeConnection,
  testSequelizeConnection,
};
