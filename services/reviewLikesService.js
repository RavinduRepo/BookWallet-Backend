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

module.exports = {
  getUsersWhoLikedReview,
};
