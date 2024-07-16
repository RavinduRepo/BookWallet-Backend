const express = require('express');
//const sequelize = require('../config/dbConfig1');
const sequelize = require('../config/dbConfig2');
const authRoutes = require('../routes/authRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', authRoutes);

// Sync database and start server
sequelize.sync()
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error('Error syncing database:', error));
