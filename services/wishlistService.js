const db = require("../config/dbConfig");
const authService = require("../services/authService");
const trendingpointsService = require("../services/trendingpointsService");
const getWishlistByUserId = async (userId) => {
  try {
    const query = `
            SELECT b.title, b.ISBN10, b.ISBN13, b.publication_date, b.description,b.pages, b.author, b.rating, b.genre, b.imageUrl,b.resource
            FROM wishlist w
            JOIN book b ON w.book_id = b.book_id
            WHERE w.user_id = ?;
        `;
    const [rows] = await db.query(query, [userId]); // Destructure to get the rows array
    console.log("Database Query Result:", rows); // Log only the rows

    if (rows.length > 0) {
      return rows; // Return the rows directly
    } else {
      return []; // Return an empty array if no rows are found
    }
  } catch (error) {
    throw new Error("Error fetching wishlist: " + error.message);
  }
};
const getBookIdWithISBN = async (isbn) => {
  try {
    const query = `SELECT book_id FROM book WHERE ISBN10 = ? OR ISBN13 = ?`;
    const [results] = await db.query(query, [isbn, isbn]);

    if (results.length === 0) {
      return [];
    }

    return results;
  } catch (error) {
    throw new Error("Error fetching book Id: " + error.message);
  }
};

const addToWishlist = async (userId, bookId) => {
  try {
    await trendingpointsService.addTrendingPoint(bookId, 8);
    const query = `INSERT INTO wishlist (user_id, book_id) VALUES (?, ?)`;
    await db.query(query, [userId, bookId]);
  } catch (error) {
    throw new Error("Error adding to wishlist: " + error.message);
  }
};
const removeFromWishlist = async (userId, bookId) => {
  try {
    const query = `DELETE FROM wishlist WHERE user_id = ? AND book_id = ?`;
    await db.query(query, [userId, bookId]);
    return { message: "Book removed from wishlist successfully" };
  } catch (error) {
    throw new Error("Error removing from wishlist: " + error.message);
  }
};

const getBookid = async (book) => {
  const {
    title,
    ISBN10,
    ISBN13,
    publication_date,
    description,
    author,
    rating,
    pages,
    genre,
    imageUrl,
    resource,
  } = book;

  try {
    // Check if the book is already available
    const checkBookSql =
      "SELECT book_id FROM book WHERE (ISBN10 = ? OR ISBN13 = ?) AND title = ?"; // Match on ISBN and title
    const [checkBookRows] = await db.query(checkBookSql, [
      ISBN10,
      ISBN13,
      title,
    ]);

    // If no book is found, return null
    if (checkBookRows.length === 0) {
      return null; // No book found with the given ISBN and title
    }

    // Book already exists, return the existing book_id
    return checkBookRows[0].book_id;
  } catch (err) {
    console.error("Database error in getBookid: ", err.message);
    throw new Error("Database error: " + err.message);
  }
};

module.exports = {
  getWishlistByUserId,
  getBookIdWithISBN,
  addToWishlist,
  removeFromWishlist,
  getBookid,
};
