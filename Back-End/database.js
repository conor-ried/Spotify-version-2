const pgp = require('pg-promise')();
const connectionOptions = {
  host: 'localhost',
  port: 5432, // Default PostgreSQL port
  database: 'spotify', // Your database name
  user: 'admin',
  password: 'adminpassword',
};

const db = pgp(connectionOptions);

module.exports = db;






// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize({
//   dialect: 'postgres',
//   database: 'spotify', //  database name
//   username: 'admin',
//   password: 'adminpassword',
//   host: 'localhost', 
// });

// module.exports = sequelize;