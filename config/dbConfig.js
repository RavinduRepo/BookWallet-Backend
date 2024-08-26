const mysql = require('mysql2');
const dotenv = require('dotenv');
// const fs = require('fs');

// Load environment variables from .env file
dotenv.config();

// Create a pool of connections to the database
const pool = mysql.createPool({
  host: process.env.DB_HOST,          // Hostname of the database server
  user: process.env.DB_USER,          // Database username
  password: process.env.DB_PASSWORD,  // Database password
  database: process.env.DB_NAME,      // Name of the database to use
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0,
  // ssl: {
  //   // SSL certificates for secure connection
  //   ca: fs.readFileSync('./server-ca.pem'),   // Replace with actual path to server CA file
  //   key: fs.readFileSync('./client-key.pem'), // Replace with actual path to client key file
  //   cert: fs.readFileSync('./client-cert.pem') // Replace with actual path to client cert file
  // },
});

// Export the pool to use in other parts of the application
module.exports = pool.promise();
