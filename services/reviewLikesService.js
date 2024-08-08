const db = require("../config/dbConfig");

const getUsersWhoLikedReview = async (reviewId) => {
  try {
    const query = `
            SELECT useR.user_id, user.username
            FROM likes
            JOIN user ON likes.user_id = user.user_id
            WHERE likes.review_id = ?
        `;

    const [rows] = await db.query(query, [reviewId]);
    console.log("Query result:", rows);

    return rows;
  } catch (error) {
    console.error("Error executing query:", error.message);
    throw new Error(
      `Error retrieving users who liked review: ${error.message}`
    );
  }
};
const likeReview = async (reviewId, userId) => {
  const query = "INSERT INTO likes (review_id, user_id) VALUES (?, ?)";
  const values = [reviewId, userId];

  await db.query(query, values);
};

const unlikeReview = async (reviewId, userId) => {
  const query = "DELETE FROM likes WHERE review_id = ? AND user_id = ?";
  const values = [reviewId, userId];

  await db.query(query, values);
};

const getLikeCount = async (reviewId) => {
  const query = "SELECT COUNT(*) AS like_count FROM likes WHERE review_id = ?";
  const [rows] = await db.query(query, [reviewId]);
  return rows[0].like_count;
};

module.exports = {
  getUsersWhoLikedReview,
  likeReview,
  unlikeReview,
  getLikeCount,
};
