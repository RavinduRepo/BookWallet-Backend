const db = require("../config/dbConfig");
const Post = require("../models/postModel");

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

const getReviews = async () => {
  const query = `
    SELECT reviewed.*, user.username, book.title, book.author, book.imageUrl
    FROM reviewed
    INNER JOIN user ON reviewed.user_id = user.user_id
    INNER JOIN book ON reviewed.book_id = book.book_id`;
  const [reviewDetails] = await db.execute(query);
  return reviewDetails;
};

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

const deleteReview = async (reviewId, userId) => {
  try {
    const query = `DELETE FROM reviewed WHERE review_id = ? AND user_id = ?`;
    await db.execute(query, [reviewId, userId]);
  } catch {
    console.log('Error deleting review from database', error);
    throw error;
  }
};

const updateReview = async (reviewId, userId, content, rating) => {
  try {
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().split(" ")[0];
    const query = `UPDATE reviewed SET context = ?, rating = ?, date = ?, time = ? 
                  WHERE review_id = ? AND user_id = ?`;
    await db.execute(query, [content, rating, date, time, reviewId, userId]);
  } catch {
    console.log('Error updating review to database', error);
    throw error;
  }
};

module.exports = {
  getReviewWithId,
  getReviews,
  getReviewWithBookId,
  getReviewWithUserId,
  deleteReview,
  updateReview
};
