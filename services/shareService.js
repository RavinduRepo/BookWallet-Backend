const db = require("../config/dbConfig"); // Adjust the path based on your project structure

exports.findShare = async (reviewId, userId) => {
  try {
    const query = 'SELECT * FROM shares WHERE review_id = ? AND user_id = ?';
    const [result] = await db.execute(query, [reviewId, userId]);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    throw new Error('Failed to find share record');
  }
};

exports.createShare = async (reviewId, userId) => {
  try {
    const query = 'INSERT INTO shares (review_id, user_id) VALUES (?, ?)';
    await db.execute(query, [reviewId, userId]);
  } catch (error) {
    throw new Error('Failed to create share record');
  }
};

exports.incrementShareCount = async (reviewId, userId) => {
  try {
    const query = 'UPDATE shares SET share_count = share_count + 1 WHERE review_id = ? AND user_id = ?';
    await db.execute(query, [reviewId, userId]);
  } catch (error) {
    throw new Error('Failed to increment share count');
  }
};
exports.getSharedReviewsByUser = async (userId) => {
  try {
    console.log('Fetching shared reviews for user:', userId); // Log the incoming user ID

    const query = `
      SELECT reviewed.review_id, 
             reviewed.book_id, 
             reviewed.user_id, 
             book.imageUrl, 
             book.title, 
             book.author, 
             reviewed.context, 
             reviewed.rating, 
             reviewed.date,
             u1.username AS reviewer_username,   -- Username of the person who wrote the review
             u2.username AS sharer_username,     -- Username of the person who shared the review
             COUNT(DISTINCT likes.user_id) AS likesCount,
             COUNT(DISTINCT comments.comment_id) AS commentsCount,
             COUNT(DISTINCT s2.share_id) AS sharesCount
      FROM shares s1
      INNER JOIN reviewed ON s1.review_id = reviewed.review_id
      INNER JOIN user u1 ON reviewed.user_id = u1.user_id   -- Join to get the reviewer's username
      INNER JOIN book ON reviewed.book_id = book.book_id
      LEFT JOIN likes ON likes.review_id = reviewed.review_id
      LEFT JOIN comments ON comments.review_id = reviewed.review_id
      LEFT JOIN shares s2 ON s2.review_id = reviewed.review_id
      INNER JOIN user u2 ON s1.user_id = u2.user_id         -- Join to get the sharer's username
      WHERE s1.user_id = ?
      GROUP BY reviewed.review_id, reviewed.book_id, reviewed.user_id, book.imageUrl, book.title, book.author, reviewed.context, reviewed.rating, reviewed.date, u1.username, u2.username;
    `;

    console.log('Executing query:', query); // Log the query being executed
    const [rows] = await db.execute(query, [userId]);
    console.log('Query result:', rows); // Log the results of the query
    return rows;
  } catch (error) {
    console.error('Error in getSharedReviewsByUser:', error.message); // Log the error message
    throw new Error('Failed to fetch shared reviews');
  }
};

