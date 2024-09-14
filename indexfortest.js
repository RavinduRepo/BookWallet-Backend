require('dotenv').config();
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to the MySQL database.');
  
  // Insert a new user
  const insertQuery = 'INSERT INTO users (name, email) VALUES (?, ?)';
  const user = ['John Doe', 'johndoe@example.com'];

  connection.query(insertQuery, user, (err, results) => {
    if (err) {
      console.error('Error inserting data:', err.message);
      return;
    }
    console.log('Inserted data:', results);

    // Fetch data from the database
    const selectQuery = 'SELECT * FROM users';

    connection.query(selectQuery, (err, results) => {
      if (err) {
        console.error('Error fetching data:', err.message);
        return;
      }
      console.log('Fetched data:', results);

      // Close the database connection
      connection.end((err) => {
        if (err) {
          console.error('Error closing the connection:', err.message);
          return;
        }
        console.log('Connection closed.');
      });
    });
  });
});
