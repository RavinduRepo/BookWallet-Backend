const db = require("../config/dbConfig");
const UserProfile = require("../models/userProfileModel");

const getUserDetails = async (userId) => {
  try {
    const sql =
      "SELECT user.user_id, user.username, user.email, user.description FROM user WHERE user_id = ?";
    const [rows] = await db.execute(sql, [userId]);

    if (rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (err) {
    throw new Error("Database error");
  }
};

const getUserProfile = async (userId, loggedInUserId) => {
  try {
    const sql =
      "SELECT user.user_id, user.username, user.email, user.description FROM user WHERE user_id = ?";
    const [rows] = await db.execute(sql, [userId]);

    if (rows.length === 0) {
      return null;
    }

    const userprofile = rows.map(
      (row) =>
        new UserProfile(
          row.user_id,
          row.username,
          row.email,
          row.description,
          "imageUrl"
        )
    );

    console.log(userprofile);

    // Check if userId is different from loggedInUserId
    if (userId !== loggedInUserId) {
      // Get current date and time from the server
      const currentDate = new Date();
      const date = currentDate.toISOString().split("T")[0]; // yyyy-mm-dd
      const time = currentDate.toTimeString().split(" ")[0]; // hh:mm:ss

      // Insert into history table
      const historySql = `
      INSERT INTO history (user_id, relevant_id, search_index, date, time)
      VALUES (?, ?, 2, ?, ?)
      ON DUPLICATE KEY UPDATE 
      date = VALUES(date), 
      time = VALUES(time)`;
      await db.execute(historySql, [loggedInUserId, userId, date, time]);
    }

    return userprofile;
  } catch (err) {
    throw new Error("Database error");
  }
};

module.exports = { getUserDetails, getUserProfile };
