const db = require("../config/dbConfig"); // Import database configuration

const followUser = async (followerId, followedId) => {
  try {
    // SQL query to insert a follow relationship and update it if a duplicate already exists
    const sql = `
            INSERT INTO user_follows (follower_id, followed_id)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE follower_id = VALUES(follower_id);`;
    const [result] = await db.query(sql, [followerId, followedId]); // Execute the query
    return { status: 201, affectedRows: result.affectedRows }; // Return success with affected rows
  } catch (err) {
    console.error("Database error in followUser: ", err.message); // Log error
    throw new Error("Database error: " + err.message); // Rethrow the error
  }
};

const unfollowUser = async (followerId, followedId) => {
  try {
    // SQL query to remove a follow relationship
    const sql = `
            DELETE FROM user_follows
            WHERE follower_id = ? AND followed_id = ?`;
    const [result] = await db.query(sql, [followerId, followedId]); // Execute the query
    if (result.affectedRows === 0) {
      return { status: 404, error: "No followers found for the given recommender ID" }; // Return 404 if no rows affected
    }
    return { status: 200, affectedRows: result.affectedRows }; // Return success with affected rows
  } catch (err) {
    console.error("Database error in unfollowUser: ", err.message); // Log error
    throw new Error("Database error: " + err.message); // Rethrow the error
  }
};

const checkIfFollowing = async (followerId, followedId) => {
  try {
    // SQL query to check if a follower-followed relationship exists
    const query = `
      SELECT COUNT(*) as count
      FROM user_follows
      WHERE follower_id = ? AND followed_id = ?`;
    const [rows] = await db.query(query, [followerId, followedId]); // Execute the query
    return rows[0].count > 0; // Return true if relationship exists, otherwise false
  } catch (err) {
    console.error("Database error in checkIfFollowing: ", err.message); // Log error
    throw new Error("Database error: " + err.message); // Rethrow the error
  }
};

module.exports = { followUser, unfollowUser, checkIfFollowing }; // Export the functions
