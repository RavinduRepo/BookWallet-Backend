const db = require("../config/dbConfig");

const followUser = async (followerId, followedId) => {
  try {
    const sql = `
            INSERT INTO user_follows (follower_id, followed_id)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE follower_id = VALUES(follower_id);`; // Prevent duplicate follows
    const [result] = await db.query(sql, [followerId, followedId]);
    return result.affectedRows > 0;
  } catch (err) {
    console.error("Database error in followUser: ", err.message);
    throw new Error("Database error: " + err.message);
  }
};

const unfollowUser = async (followerId, followedId) => {
  try {
    const sql = `
            DELETE FROM user_follows
            WHERE follower_id = ? AND followed_id = ?`;
    const [result] = await db.query(sql, [followerId, followedId]);
    return result.affectedRows > 0;
  } catch (err) {
    console.error("Database error in unfollowUser: ", err.message);
    throw new Error("Database error: " + err.message);
  }
};

// Check if a user is following another user
const checkIfFollowing = async (followerId, followedId) => {
  try {
    const query = `
      SELECT COUNT(*) as count
      FROM user_follows
      WHERE follower_id = ? AND followed_id = ?`;
    const [rows] = await db.query(query, [followerId, followedId]);
    return rows[0].count > 0;
  } catch (err) {
    console.error("Database error in checkIfFollowing: ", err.message);
    throw new Error("Database error: " + err.message);
  }
};

module.exports = { followUser, unfollowUser, checkIfFollowing };
