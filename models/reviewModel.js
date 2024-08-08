const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig2");

const Review = sequelize.define("Review", {
  review_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true, // Assuming this is the primary key
    autoIncrement: true, // If it's auto-incrementing
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
  likes_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // Default to 0 if not specified
  },
  comments_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // Default to 0 if not specified
  },
  shares_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // Default to 0 if not specified
  },
});

module.exports = Review;
