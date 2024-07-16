const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('logintest', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
