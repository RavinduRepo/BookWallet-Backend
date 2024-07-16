const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig1');

const Image = sequelize.define('Image', {
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Image;
