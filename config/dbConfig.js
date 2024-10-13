const mysql = require("mysql2");
const dotenv = require("dotenv");
const fs = require("fs");

// Load environment variables from .env file
dotenv.config();

// Create a pool of connections to the database
const pool = mysql.createPool({
  host: process.env.DB_HOST, // Hostname of the database server
  user: process.env.DB_USER, // Database username
  password: process.env.DB_PASSWORD, // Database password
  database: process.env.DB_NAME, // Name of the database to use

  // // Un-comment to connect to Google cloud SQL database ....................
  // ssl: { 
  //   key: fs.readFileSync(process.env.DB_SSL_KEY),
  //   cert: fs.readFileSync(process.env.DB_SSL_CERT),
  //   ca: fs.readFileSync(process.env.DB_SSL_CA)
  // }
  // // .......................................................................
});

// Export the pool to use in other parts of the application
module.exports = pool.promise();
