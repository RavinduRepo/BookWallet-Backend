const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // Server Password
  database: "bookwallet", // Database Name
});

module.exports = pool.promise();
