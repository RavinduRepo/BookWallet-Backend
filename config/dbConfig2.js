const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('book_wallet', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
