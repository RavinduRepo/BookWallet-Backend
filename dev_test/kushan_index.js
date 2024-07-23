const express = require('express');
const authRoutes = require('../routes/authRoutes');
const postRoutes = require('../routes/postRoutes');
const imageRoutes = require('../routes/imageRoutes');
const reviewRoutes = require('../routes/reviewRoutes');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());

// Use the routes
app.use('/api', authRoutes);
app.use('/api', postRoutes);
app.use('/api', imageRoutes);
app.use('/api', reviewRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
