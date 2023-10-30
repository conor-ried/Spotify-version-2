const pgp = require('pg-promise')();

let connectionOptions;
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;
if (process.env.NODE_ENV === 'test') {
  // Use a separate database for tests
  connectionOptions = {
    host: 'localhost',
    port: 5432,
    database: 'spotify_test', // Your test database name
    user: 'admin',
    password: 'adminpassword',
  };
} else if (process.env.DATABASE_URL) {
  // Use DATABASE_URL if available (e.g., in production)
  connectionOptions = process.env.DATABASE_URL;
} else {
  // Use explicit connection options for local development
  connectionOptions = {
    host: 'localhost',
    port: 5432, 
    database: 'spotify', 
    user: 'admin',
    password: 'adminpassword',
  };
}

const db = pgp(connectionOptions);

module.exports = db;





