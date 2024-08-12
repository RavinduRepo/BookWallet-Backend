const db = require("../config/dbConfig");
const User = require("../models/userModel"); // Ensure the class is named User

// Function to get users who liked a review
const getUsersWhoLikedReview = async (reviewId) => {
  try {
    const query = `
            SELECT user.user_id, user.username
            FROM likes
            JOIN user ON likes.user_id = user.user_id
            WHERE likes.review_id = ?
        `;

    const [rows] = await db.execute(query, [reviewId]);
    console.log("Query result:", rows);

    if (rows.length === 0) {
      return { status: 404, message: "No users found" };
    }

    const users = rows.map(
      (row) => new User(row.username, null, row.user_id) // Adjusted constructor parameters
    );

    return { status: 200, data: users };
  } catch (error) {
    console.error("Error executing query:", error.message);
    console.error("Stack trace:", error.stack); // Added stack trace for debugging
    return {
      status: 500,
      message: `Error retrieving users who liked review: ${error.message}`,
    };
  }
};

// Function to like a review
const likeReview = async (reviewId, userId) => {
  try {
    const query = "INSERT INTO likes (review_id, user_id) VALUES (?, ?)";
    const values = [reviewId, userId];

    await db.query(query, values);
    return { status: 200, message: "Review liked successfully" };
  } catch (error) {
    console.error("Error liking review:", error.message);
    return { status: 500, message: `Error liking review: ${error.message}` };
  }
};

// Function to unlike a review
const unlikeReview = async (reviewId, userId) => {
  try {
    const query = "DELETE FROM likes WHERE review_id = ? AND user_id = ?";
    const values = [reviewId, userId];

    await db.query(query, values);
    return { status: 200, message: "Review unliked successfully" };
  } catch (error) {
    console.error("Error unliking review:", error.message);
    return { status: 500, message: `Error unliking review: ${error.message}` };
  }
};

// Function to get like count for a review
const getLikeCount = async (reviewId) => {
  try {
    const query =
      "SELECT COUNT(*) AS like_count FROM likes WHERE review_id = ?";
    const [rows] = await db.query(query, [reviewId]);
    return { status: 200, data: rows[0].like_count };
  } catch (error) {
    console.error("Error fetching like count:", error.message);
    return {
      status: 500,
      message: `Error fetching like count: ${error.message}`,
    };
  }
};

// Function to check if a user liked a review
const checkIfLiked = async (userId, reviewId) => {
  try {
    const query = `
      SELECT COUNT(*) as count
      FROM likes
      WHERE user_id = ? AND review_id = ?`;
    const [rows] = await db.query(query, [userId, reviewId]);
    return { status: 200, data: rows[0].count > 0 };
  } catch (err) {
    console.error("Database error in checkIfLiked: ", err.message);
    return { status: 500, message: `Database error: ${err.message}` };
  }
};

module.exports = {
  getUsersWhoLikedReview,
  likeReview,
  unlikeReview,
  getLikeCount,
  checkIfLiked,
};
