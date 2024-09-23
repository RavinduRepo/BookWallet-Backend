const db = require("../config/dbConfig");
const Post = require("../models/postModel");
const Book = require("../models/bookModel");
class SavedItemsService {
  async getSavedReviewsByUserId(userId) {
    const query = `
       SELECT 
        r.review_id AS reviewId,
        r.book_id AS bookId,
        r.user_id AS userId,
        b.imageUrl AS imagePath,
        b.title AS bookName,
        b.author AS authorName,
        r.context AS context,
        r.rating AS rating,
        h.date AS date,          -- Fetching date from history
        h.time AS time,          -- Fetching time from history
        u.username AS reviewerName,
        (
          SELECT COUNT(*) FROM likes l WHERE l.review_id = r.review_id
        ) AS likesCount,
        (
          SELECT COUNT(*) FROM comments c WHERE c.review_id = r.review_id
        ) AS commentsCount,
        (
          SELECT COUNT(*) FROM shares s WHERE s.review_id = r.review_id
        ) AS sharesCount
      FROM saved h
      JOIN reviewed r ON h.relevant_id = r.review_id
      JOIN book b ON r.book_id = b.book_id
      JOIN user u ON r.user_id = u.user_id
      WHERE h.user_id = ? AND h.save_index = 0  -- Filtering by save_index
      ORDER BY h.date DESC, h.time DESC;
    `;
    const [rows] = await db.query(query, [userId]);

    return rows.map((row) => ({
      post: new Post(
        row.reviewId,
        row.bookId,
        row.userId,
        row.imagePath,
        row.bookName,
        row.authorName,
        row.context,
        row.rating,
        row.date, // Attach date
        row.reviewerName,
        row.likesCount,
        row.commentsCount,
        row.sharesCount
      ),
    }));
  }

  async getSavedBooksByUserId(userId) {
    const query = `
      SELECT 
        b.book_id AS bookId,
        b.title AS title,
        b.ISBN10 AS ISBN10,
        b.ISBN13 AS ISBN13,
        b.publication_date AS publishedDate,
        b.description AS description,
        b.author AS author,
        b.rating AS totalRating,
        b.pages AS pages,
        b.genre AS genre,
        b.imageUrl AS imageUrl,
        b.resource AS resource
      FROM saved h
      JOIN book b ON h.relevant_id = b.book_id
      WHERE h.user_id = ? AND h.save_index = 1  -- Filtering by search_index
      ORDER BY h.date DESC, h.time DESC;
    `;
    const [rows] = await db.query(query, [userId]);

    return rows.map((row) => ({
      book: new Book(
        row.bookId,
        row.title,
        row.ISBN10,
        row.ISBN13,
        row.publishedDate,
        row.description,
        row.author,
        row.totalRating,
        row.pages,
        row.genre,
        row.imageUrl,
        row.resource
      ),
    }));
  }

  async getSavedProfilesByUserId(userId) {
    const query = `
      SELECT 
        u.user_id AS userId,
        u.username AS username,
        u.imageUrl AS imageUrl
      FROM saved h
      JOIN user u ON h.relevant_id = u.user_id
      WHERE h.user_id = ? AND h.save_index = 2  -- Filtering by search_index
      ORDER BY h.date DESC, h.time DESC;
    `;
    const [rows] = await db.query(query, [userId]);

    return rows.map((row) => ({
      userDetails: {
        userId: row.userId,
        username: row.username,
        imageUrl: "imageUrl", //row.imageUrl,
      },
    }));
  }
  async insertSavedReview(user_id, relevant_id) {
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().split(" ")[0];

    const query = `
      INSERT INTO saved (user_id, relevant_id, save_index, date, time)
      VALUES (?, ?, 0, ?, ?)
      ON DUPLICATE KEY UPDATE date = VALUES(date), time = VALUES(time)
    `;

    await db.query(query, [user_id, relevant_id, date, time]);
  }

  async insertSavedBook(user_id, relevant_id) {
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().split(" ")[0];

    const query = `
      INSERT INTO saved (user_id, relevant_id, save_index, date, time)
      VALUES (?, ?, 1, ?, ?)
      ON DUPLICATE KEY UPDATE date = VALUES(date), time = VALUES(time)
    `;

    await db.query(query, [user_id, relevant_id, date, time]);
  }

  async insertSavedProfile(user_id, relevant_id) {
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().split(" ")[0];

    const query = `
      INSERT INTO saved (user_id, relevant_id, save_index, date, time)
      VALUES (?, ?, 2, ?, ?)
      ON DUPLICATE KEY UPDATE date = VALUES(date), time = VALUES(time)
    `;

    await db.query(query, [user_id, relevant_id, date, time]);
  }
  async removeSavedReview(user_id, relevant_id) {
    const query = `
      DELETE FROM saved
      WHERE user_id = ? AND relevant_id = ? AND save_index = 0
    `;
    await db.query(query, [user_id, relevant_id]);
  }

  async removeSavedBook(user_id, relevant_id) {
    const query = `
      DELETE FROM saved
      WHERE user_id = ? AND relevant_id = ? AND save_index = 1
    `;
    await db.query(query, [user_id, relevant_id]);
  }

  async removeSavedProfile(user_id, relevant_id) {
    const query = `
      DELETE FROM saved
      WHERE user_id = ? AND relevant_id = ? AND save_index = 2
    `;
    await db.query(query, [user_id, relevant_id]);
  }
  async isReviewSavedByUser(user_id, relevant_id) {
    const query = `
      SELECT COUNT(*) AS count
      FROM saved
      WHERE user_id = ? AND relevant_id = ? AND save_index = 0
    `;
    const [rows] = await db.query(query, [user_id, relevant_id]);
    return rows[0].count > 0; // Returns true if count > 0, false otherwise
  }

  async isBookSavedByUser(user_id, relevant_id) {
    const query = `
      SELECT COUNT(*) AS count
      FROM saved
      WHERE user_id = ? AND relevant_id = ? AND save_index = 1
    `;
    const [rows] = await db.query(query, [user_id, relevant_id]);
    return rows[0].count > 0;
  }

  async isProfileSavedByUser(user_id, relevant_id) {
    const query = `
      SELECT COUNT(*) AS count
      FROM saved
      WHERE user_id = ? AND relevant_id = ? AND save_index = 2
    `;
    const [rows] = await db.query(query, [user_id, relevant_id]);
    return rows[0].count > 0;
  }
}

module.exports = new SavedItemsService();
