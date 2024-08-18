// Import required modules
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use the PORT environment variable or default to 3000

// Middleware to handle JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default route that responds with "OK"
app.get('/', (req, res) => {
  res.send('OK');
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
