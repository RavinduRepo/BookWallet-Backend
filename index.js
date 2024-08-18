const express = require('express');
const sql = require('mssql');

// Configuration for your Azure SQL Database
const config = {
    user: 'TheBookWalletAdmin',
    password: 'IamBookWalletAdminE20280@123',
    server: 'thebookwallet.database.windows.net',
    database: 'bookwallet',
    options: {
        encrypt: true, // Use encryption
        trustServerCertificate: false // Change to true if using self-signed certificates
    }
};


// Initialize the Express application
const app = express();
app.use(express.json());

// Create a connection pool
let pool;

async function getConnection() {
    if (!pool) {
        pool = await sql.connect(config);
    }
    return pool;
}

// Endpoint to insert data into the database
app.post('/add-user', async (req, res) => {
    const { UserName, UserEmail, DateOfBirth } = req.body;
    console.log("trinng add");
    try {
        const pool = await getConnection();
        await pool.request()
            .input('UserName', sql.NVarChar, UserName)
            .input('UserEmail', sql.NVarChar, UserEmail)
            .input('DateOfBirth', sql.Date, DateOfBirth)
            .query('INSERT INTO Users (UserName, UserEmail, DateOfBirth) VALUES (@UserName, @UserEmail, @DateOfBirth)');

        res.status(200).send('User added successfully');
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Error inserting data');
    }
});

// Endpoint to get data from the database
app.get('/get-users', async (req, res) => {
    console.log("trinng get");

    try {

        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Users');
        
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).send('Error retrieving data');
    }
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




















// // Import required modules
// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3000; // Use the PORT environment variable or default to 3000

// // Middleware to handle JSON and URL-encoded form data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Default route that responds with a static JSON object
// app.get('/test', (req, res) => {
//   res.json({
//     message: 'OK',
//     status: 200,
//     data: {
//       name: 'Book Wallet',
//       version: '1.0.0',
//       description: 'This is a simple API response from Book Wallet.',
//       author: 'Your Name'
//     }
//   });
// });

// // Start the server and listen on the specified port
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
