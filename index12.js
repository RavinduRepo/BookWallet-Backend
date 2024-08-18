// Import required modules
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use the PORT environment variable or default to 3000

// Middleware to handle JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default route that responds with a static JSON object
app.get('/test', (req, res) => {
  res.json({
    message: 'OK',
    status: 200,
    data: {
      name: 'Book Wallet',
      version: '1.0.0',
      description: 'This is a simple API response from Book Wallet.',
      author: 'Your Name'
    }
  });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
