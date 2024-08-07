const db = require("../config/dbConfig"); // Import the Promise-based pool

const addReview = async (review, bookId) => {
  console.log("tring to post a review1111");

  const { user_id, context, rating: reviewRating, group_id } = review;

  try {
    console.log("tring to post a review");
  // Check if the user exists
  const checkUserSql = "SELECT user_id FROM user WHERE user_id = ?";
  const [checkUserRows] = await db.query(checkUserSql, [user_id]);

  if (checkUserRows.length === 0) {
    throw new Error("User does not exist.");
  }

  // Get current date and time
  const now = new Date();
  const date = now.toISOString().split("T")[0]; // YYYY-MM-DD
  const time = now.toTimeString().split(" ")[0]; // HH:MM:SS

  // Insert the review
  const insertReviewSql = `
    INSERT INTO reviewed (book_id, user_id, context, rating, date, time, group_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const [reviewResult] = await db.query(insertReviewSql, [
    bookId,
    user_id,
    context,
    reviewRating,
    date,
    time,
    group_id,
  ]);

  return reviewResult.affectedRows > 0;

  } catch (err) {
    console.error("Database error in addBookAndReview: ", err.message);
    throw new Error("Database error: " + err.message);
  }
};

module.exports = { addReview };
