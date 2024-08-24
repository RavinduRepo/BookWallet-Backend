const db = require("../config/dbConfig");
const UserProfile = require("../models/userProfileModel");

const getUserDetails = async (userId) => {
    try {
      const sql = "SELECT user.user_id, user.username, user.email, user.description FROM user WHERE user_id = ?";
      const [rows] = await db.execute(sql, [userId]);
  
      if (rows.length > 0) {
        return rows[0];
      } else {
        return null;
      }
    } catch (err) {
      throw new Error('Database error');
    }
};

const getUserProfile = async (userId) => {
  try {
    const sql = "SELECT user.user_id, user.username, user.email, user.description FROM user WHERE user_id = ?";
    const [rows] = await db.execute(sql, [userId]);

    if (rows.length === 0) {
      return null;
    }

    const userprofile = rows.map(row => new UserProfile(
      row.user_id,
      row.username,
      row.email,
      row.description,
      'imageUrl',
    ));

    return userprofile;
  } catch (err) {
      throw new Error('Database error');
  }
};

module.exports = { getUserDetails, getUserProfile };