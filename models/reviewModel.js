// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/dbConfig"); // Make sure this points to your actual database configuration file

// const Review = sequelize.define("Review", {
//   review_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     primaryKey: true, // This field will be used as the primary key
//     autoIncrement: true, // Enables auto-increment for the primary key
//   },
//   book_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   user_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   context: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   rating: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   date: {
//     type: DataTypes.DATE,
//     allowNull: false,
//     defaultValue: DataTypes.NOW, // Automatically sets the current date and time
//   },
//   group_id: {
//     type: DataTypes.INTEGER,
//     allowNull: true, // Nullable since a review might not be associated with a group
//   },
//   likes_count: {
//     type: DataTypes.INTEGER,
//     defaultValue: 0, // Defaults to 0 if not specified
//   },
//   comments_count: {
//     type: DataTypes.INTEGER,
//     defaultValue: 0, // Defaults to 0 if not specified
//   },
//   shares_count: {
//     type: DataTypes.INTEGER,
//     defaultValue: 0, // Defaults to 0 if not specified
//   },
// });

// module.exports = Review;
