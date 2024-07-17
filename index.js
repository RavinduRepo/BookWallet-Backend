const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const imageRoutes = require('./routes/imageRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const googleAPIRoutes = require('./routes/googleapiRoutes');
const postRoutes = require('./routes/postRoutess');

const db = require('./config/dbConfig');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/googleapi', googleAPIRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
 