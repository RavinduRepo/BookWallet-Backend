const express = require('express');
const configureMiddleware = require('./authMiddleware');
const routes = require('./storeRoutes');

const app = express();
const port = 3000;

// Configure middleware
configureMiddleware(app);

// Configure routes
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
