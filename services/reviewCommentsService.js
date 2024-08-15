const Comment = require("../models/commentModel"); // Import the Comment model
const db = require("../config/dbConfig");

const addCommentService = async (comment, reviewId) => {
  const { user_id, context } = comment;

  try {
    // Check if the user exists
    const checkUserSql = "SELECT user_id FROM user WHERE user_id = ?";
    const [checkUserRows] = await db.query(checkUserSql, [user_id]);

    if (checkUserRows.length === 0) {
      throw new Error("User does not exist.");
    }

    // Insert the comment
    const insertCommentSql = `
      INSERT INTO comments (review_id, user_id, context, date, time)
      VALUES (?, ?, ?, ?, ?)`;

    //Take actual time //Not taking  frontend
    const now = new Date();
    const date = now.toISOString().split("T")[0]; // YYYY-MM-DD
    const time = now.toTimeString().split(" ")[0]; // HH:MM:SS

    const [commentResult] = await db.query(insertCommentSql, [
      reviewId,
      user_id,
      context,
      date,
      time,
    ]);

    return commentResult.affectedRows > 0;
  } catch (err) {
    console.error("Database error in addComment: ", err.message);
    throw new Error("Database error: " + err.message);
  }
};

const getCommentsByReviewIdService = async (reviewId) => {
  try {
    const query = `
      SELECT comments.comment_id AS commentId, 
             comments.user_id AS userId, 
             comments.review_id AS reviewId, 
             comments.context, 
             comments.date, 
             comments.time,
             user.username
             
      FROM comments
      INNER JOIN user ON comments.user_id = user.user_id
      WHERE comments.review_id = ?
      ORDER BY comments.date DESC, comments.time DESC
    `;
    const [commentsDetails] = await db.execute(query, [reviewId]);
    return commentsDetails.map(
      (commentDetail) =>
        new Comment(
          commentDetail.commentId,
          commentDetail.userId,
          commentDetail.reviewId,
          commentDetail.context,
          commentDetail.date,
          commentDetail.time,
          commentDetail.username
        )
    );
  } catch (error) {
    console.error("Error fetching comments:", error.message);
    throw new Error("Error fetching comments: " + error.message);
  }
};
module.exports = { addCommentService, getCommentsByReviewIdService };
