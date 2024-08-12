const db = require("../config/dbConfig"); // Import the Promise-based pool

const addCommentService = async (comment, reviewId) => {
  console.log("Trying to post a comment");

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

module.exports = { addCommentService };
