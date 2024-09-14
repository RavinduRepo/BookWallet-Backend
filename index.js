require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

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
});

// Endpoint to insert a new user
app.post('/add-user', (req, res) => {
  const { name, email } = req.body;

  const insertQuery = 'INSERT INTO users (name, email) VALUES (?, ?)';
  connection.query(insertQuery, [name, email], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err.message);
      return res.status(500).send('Error inserting data');
    }
    res.send('User added successfully!');
  });
});

// Endpoint to fetch and display all users
app.get('/users', (req, res) => {
  const selectQuery = 'SELECT * FROM users';

  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err.message);
      return res.status(500).send('Error fetching data');
    }
    res.json(results); // Send the results as JSON response
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
