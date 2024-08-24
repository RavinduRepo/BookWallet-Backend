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
      FROM history h
      JOIN reviewed r ON h.relevent_id = r.review_id
      JOIN book b ON r.book_id = b.book_id
      JOIN user u ON r.user_id = u.user_id
      WHERE h.user_id = ? AND h.search_index = 0  -- Filtering by search_index
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
      date: row.date, // Attach date separately
      time: row.time, // Attach time separately
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
        h.date AS date,          -- Fetching date from history
        h.time AS time           -- Fetching time from history
      FROM history h
      JOIN book b ON h.relevent_id = b.book_id
      WHERE h.user_id = ? AND h.search_index = 1  -- Filtering by search_index
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
      date: row.date, // Attach date separately
      time: row.time, // Attach time separately
    }));
  }

  async getUserDetailsByUserId(userId) {
    const query = `
      SELECT 
        u.user_id AS userId,
        u.username AS username,
        u.imageUrl AS imageUrl,
        h.date AS date,          -- Fetching date from history
        h.time AS time           -- Fetching time from history
      FROM history h
      JOIN user u ON h.relevent_id = u.user_id
      WHERE h.user_id = ? AND h.search_index = 2  -- Filtering by search_index
      ORDER BY h.date DESC, h.time DESC;
    `;

    const [rows] = await db.query(query, [userId]);

    return rows.map((row) => ({
      userDetails: {
        userId: row.userId,
        username: row.username,
        imageUrl: "imageUrl", //row.imageUrl,
      },
      date: row.date, // Attach date separately
      time: row.time, // Attach time separately
    }));
  }

  async getAllItems(userId) {
    const reviewsPromise = this.getReviewsByUserId(userId);
    const booksPromise = this.getBooksByUserId(userId);
    const userDetailsPromise = this.getUserDetailsByUserId(userId);

    const [reviews, books, userDetails] = await Promise.all([
      reviewsPromise,
      booksPromise,
      userDetailsPromise,
    ]);

    // Combine all items into a single array with an added 'type' field for differentiation
    const combinedItems = [
      ...reviews.map((item) => ({ ...item, type: "review" })),
      ...books.map((item) => ({ ...item, type: "book" })),
      ...userDetails.map((item) => ({ ...item, type: "user" })),
    ];

    // Sort by date and time in descending order using fetched date and time
    combinedItems.sort((a, b) => {
      const dateComparison =
        new Date(b.date).getTime() - new Date(a.date).getTime();
      if (dateComparison === 0) {
        const timeA = a.time ? new Date(`1970-01-01T${a.time}Z`).getTime() : 0;
        const timeB = b.time ? new Date(`1970-01-01T${b.time}Z`).getTime() : 0;
        return timeB - timeA;
      }
      return dateComparison;
    });

    return combinedItems;
  }
}

module.exports = new HistoryService();
