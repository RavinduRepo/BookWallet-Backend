const db = require("../config/dbConfig");
const Post = require("../models/postModel");
const Book = require("../models/bookModel");

class HistoryService {
  async getReviewsByUserId(userId) {
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
        r.date AS date,
        u.username AS reviewerName,
        (
          SELECT COUNT(*) FROM likes l WHERE l.review_id = r.review_id
        ) AS likesCount,
        (
          SELECT COUNT(*) FROM comments c WHERE c.review_id = r.review_id
        ) AS commentsCount,
        (
          SELECT COUNT(*) FROM shares s WHERE s.review_id = r.review_id
        ) AS sharesCount,
        h.search_index AS searchIndex
      FROM history h
      JOIN reviewed r ON h.relevent_id = r.review_id
      JOIN book b ON r.book_id = b.book_id
      JOIN user u ON r.user_id = u.user_id
      WHERE h.user_id = ? AND h.search_index = 0
      ORDER BY h.date DESC, h.time DESC;
    `;

    const [rows] = await db.query(query, [userId]);

    // Return an array of objects containing the Post instance and the searchIndex
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
        row.date,
        row.reviewerName,
        row.likesCount,
        row.commentsCount,
        row.sharesCount
      ),
      searchIndex: row.searchIndex,
    }));
  }

  async getBooksByUserId(userId) {
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
        b.resource AS resource,
        h.search_index AS searchIndex
      FROM history h
      JOIN book b ON h.relevent_id = b.book_id
      WHERE h.user_id = ? AND h.search_index = 1
      ORDER BY h.date DESC, h.time DESC;
    `;

    const [rows] = await db.query(query, [userId]);

    // Return an array of objects containing the Book instance and the searchIndex
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
      searchIndex: row.searchIndex,
    }));
  }
  async getUserDetailsByUserId(userId) {
    const query = `
      SELECT 
        u.user_id AS userId,
        u.username AS username,
        u.imageUrl AS imageUrl
      FROM history h
      JOIN user u ON h.relevent_id = u.user_id
      WHERE h.user_id = ? AND h.search_index = 2
      ORDER BY h.date DESC, h.time DESC;
    `;

    const [rows] = await db.query(query, [userId]);

    return rows.map((row) => ({
      searchIndex: 2,
      userDetails: {
        userId: row.userId,
        username: row.username,
        imageUrl: "imageUrl", //row.imageUrl,
      },
    }));
  }
}

module.exports = new HistoryService();
