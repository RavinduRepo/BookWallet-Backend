const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig2');

const Review = sequelize.define('Review', {
  review_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  context: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  group_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Review;
