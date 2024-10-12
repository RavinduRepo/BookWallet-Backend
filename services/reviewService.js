const db = require("../config/dbConfig");
const Post = require("../models/postModel");

/**
 * Fetches review details by review ID from the database.
 * It also includes additional information like book details, user info,
 * and counts of likes, comments, and shares.
 *
 * @param {string} reviewId - The ID of the review to be fetched.
 * @returns {Array} An array of review details mapped to the Post model.
 */
const getReviewWithId = async (reviewId) => {
  const query = `
    SELECT reviewed.review_id, 
        reviewed.book_id, 
        reviewed.user_id, 
        reviewed.context, 
        reviewed.rating, 
        reviewed.date,
        book.title, 
        book.author, 
        book.imageUrl, 
        user.username,
        COUNT(DISTINCT likes.user_id) AS likesCount,
        COUNT(DISTINCT comments.comment_id) AS commentsCount,
        COUNT(DISTINCT shares.share_id) AS sharesCount
    FROM reviewed
    INNER JOIN user ON reviewed.user_id = user.user_id
    INNER JOIN book ON reviewed.book_id = book.book_id
    LEFT JOIN likes ON likes.review_id = reviewed.review_id
    LEFT JOIN comments ON comments.review_id = reviewed.review_id
    LEFT JOIN shares ON shares.review_id = reviewed.review_id
    WHERE reviewed.review_id = ?
    GROUP BY reviewed.review_id, 
          reviewed.book_id, 
          reviewed.user_id, 
          reviewed.context, 
          reviewed.rating, 
          reviewed.date,
          book.title, 
          book.author, 
          book.imageUrl, 
          user.username
    ORDER BY reviewed.date DESC, reviewed.time DESC`;

  const [reviewDetails] = await db.execute(query, [reviewId]);

  // Map review details to Post model and return them
  return reviewDetails.map(
    (reviewDetail) =>
      new Post(
        reviewDetail.review_id,
        reviewDetail.book_id,
        reviewDetail.user_id,
        reviewDetail.imageUrl,
        reviewDetail.title,
        reviewDetail.author,
        reviewDetail.context,
        reviewDetail.rating,
        reviewDetail.date,
        reviewDetail.username,
        reviewDetail.likesCount,
        reviewDetail.commentsCount,
        reviewDetail.sharesCount
      )
  );
};

/**
 * Fetches all reviews from the database.
 * Includes information like book title, author, and username of the reviewer.
 *
 * @returns {Array} An array of review details.
 */
const getReviews = async () => {
  const query = `
    SELECT reviewed.*, user.username, book.title, book.author, book.imageUrl
    FROM reviewed
    INNER JOIN user ON reviewed.user_id = user.user_id
    INNER JOIN book ON reviewed.book_id = book.book_id`;

  const [reviewDetails] = await db.execute(query);

  return reviewDetails; // Return all reviews as-is
};

/**
 * Fetches reviews related to a specific book ID.
 * This function also aggregates likes, comments, and shares for each review.
 *
 * @param {string} bookId - The ID of the book to fetch reviews for.
 * @returns {Array} An array of reviews mapped to the Post model.
 */
const getReviewWithBookId = async (bookId) => {
  const query = `
    SELECT reviewed.review_id, 
        reviewed.book_id, 
        reviewed.user_id, 
        reviewed.context, 
        reviewed.rating, 
        reviewed.date,
        book.title, 
        book.author, 
        book.imageUrl, 
        user.username,
        COUNT(DISTINCT likes.user_id) AS likesCount,
        COUNT(DISTINCT comments.comment_id) AS commentsCount,
        COUNT(DISTINCT shares.share_id) AS sharesCount
    FROM reviewed
    INNER JOIN user ON reviewed.user_id = user.user_id
    INNER JOIN book ON reviewed.book_id = book.book_id
    LEFT JOIN likes ON likes.review_id = reviewed.review_id
    LEFT JOIN comments ON comments.review_id = reviewed.review_id
    LEFT JOIN shares ON shares.review_id = reviewed.review_id
    WHERE book.book_id = ?
    GROUP BY reviewed.review_id, 
          reviewed.book_id, 
          reviewed.user_id, 
          reviewed.context, 
          reviewed.rating, 
          reviewed.date,
          book.title, 
          book.author, 
          book.imageUrl, 
          user.username
    ORDER BY reviewed.date DESC, reviewed.time DESC`;

  const [reviewDetails] = await db.execute(query, [bookId]);

  // Map review details to Post model and return them
  return reviewDetails.map(
    (reviewDetail) =>
      new Post(
        reviewDetail.review_id,
        reviewDetail.book_id,
        reviewDetail.user_id,
        reviewDetail.imageUrl,
        reviewDetail.title,
        reviewDetail.author,
        reviewDetail.context,
        reviewDetail.rating,
        reviewDetail.date,
        reviewDetail.username,
        reviewDetail.likesCount,
        reviewDetail.commentsCount,
        reviewDetail.sharesCount
      )
  );
};

/**
 * Fetches reviews posted by a specific user ID.
 * This function aggregates likes, comments, and shares for each review.
 *
 * @param {string} userId - The ID of the user whose reviews to fetch.
 * @returns {Array} An array of reviews mapped to the Post model.
 */
const getReviewWithUserId = async (userId) => {
  const query = `
    SELECT reviewed.review_id, 
           reviewed.book_id, 
           reviewed.user_id, 
           reviewed.context, 
           reviewed.rating, 
           reviewed.date,
           book.title, 
           book.author, 
           book.imageUrl, 
           user.username,
           COUNT(DISTINCT likes.user_id) AS likesCount,
           COUNT(DISTINCT comments.comment_id) AS commentsCount,
           COUNT(DISTINCT shares.share_id) AS sharesCount
    FROM reviewed
    INNER JOIN user ON reviewed.user_id = user.user_id
    INNER JOIN book ON reviewed.book_id = book.book_id
    LEFT JOIN likes ON likes.review_id = reviewed.review_id
    LEFT JOIN comments ON comments.review_id = reviewed.review_id
    LEFT JOIN shares ON shares.review_id = reviewed.review_id
    WHERE user.user_id = ?
    GROUP BY reviewed.review_id, 
             reviewed.book_id, 
             reviewed.user_id, 
             reviewed.context, 
             reviewed.rating, 
             reviewed.date,
             book.title, 
             book.author, 
             book.imageUrl, 
             user.username
    ORDER BY reviewed.date DESC, reviewed.time DESC`;

  const [reviewDetails] = await db.execute(query, [userId]);

  // Map review details to Post model and return them
  return reviewDetails.map(
    (reviewDetail) =>
      new Post(
        reviewDetail.review_id,
        reviewDetail.book_id,
        reviewDetail.user_id,
        reviewDetail.imageUrl,
        reviewDetail.title,
        reviewDetail.author,
        reviewDetail.context,
        reviewDetail.rating,
        reviewDetail.date,
        reviewDetail.username,
        reviewDetail.likesCount,
        reviewDetail.commentsCount,
        reviewDetail.sharesCount
      )
  );
};

/**
 * Deletes a review by its ID and user ID from the database.
 *
 * @param {string} reviewId - The ID of the review to be deleted.
 * @param {string} userId - The ID of the user who posted the review.
 * @throws Will throw an error if the deletion fails.
 */
const deleteReview = async (reviewId, userId) => {
  try {
    const query = `DELETE FROM reviewed WHERE review_id = ? AND user_id = ?`;
    await db.execute(query, [reviewId, userId]);
  } catch (error) {
    console.log("Error deleting review from database", error);
    throw error;
  }
};

/**
 * Updates a review by its ID and user ID with new content and rating.
 *
 * @param {string} reviewId - The ID of the review to be updated.
 * @param {string} userId - The ID of the user who posted the review.
 * @param {string} content - The new content of the review.
 * @param {number} rating - The new rating of the review.
 * @throws Will throw an error if the update fails.
 */
const updateReview = async (reviewId, userId, content, rating) => {
  try {
    const now = new Date();
    const date = now.toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    const time = now.toTimeString().split(" ")[0]; // Get current time in HH:MM:SS format
    const query = `UPDATE reviewed SET context = ?, rating = ?, date = ?, time = ? 
                  WHERE review_id = ? AND user_id = ?`;
    await db.execute(query, [content, rating, date, time, reviewId, userId]);
  } catch (error) {
    console.log("Error updating review to database", error);
    throw error;
  }
};

module.exports = {
  getReviewWithId,
  getReviews,
  getReviewWithBookId,
  getReviewWithUserId,
  deleteReview,
  updateReview,
};
