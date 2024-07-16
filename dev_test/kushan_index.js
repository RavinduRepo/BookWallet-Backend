const express = require('express');
//const sequelize = require('../config/dbConfig1');
const sequelize = require('../config/dbConfig2');
const authRoutes = require('../routes/authRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

const port = process.env.PORT || 2000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// Import the authentication routes
const authRoutes = require('../routes/kushanRoutes');
//const bookRoutes = require('../routes/bookRoutes');

// Use the routes
app.use('/api', authRoutes);

