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
    const query = `INSERT INTO wishlist (user_id, book_id) VALUES (?, ?)`;
    await db.query(query, [userId, bookId]);
  } catch (error) {
    throw new Error("Error adding to wishlist: " + error.message);
  }
};

const postWishlistBook = async (req, res) => {
  const { bookId, userId } = req.params;
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the Authorization header

  if (!userId || !bookId) {
    return res.status(400).json({ message: "User ID or Book ID is required" });
  }

  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  try {
    // Decode and verify the token
    const decoded = await authService.verifyToken(token);
    const tokenUserId = decoded.id.toString();

    // Check if the token user ID matches the user ID from the request
    if (tokenUserId !== userId) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    // Check if the book is already in the user's wishlist
    const checkQuery = `SELECT * FROM wishlist WHERE user_id = ? AND book_id = ?`;
    const [rows] = await db.execute(checkQuery, [userId, bookId]);

    if (rows.length > 0) {
      return res.status(409).json({ message: "Book already in the wishlist" });
    }
    await trendingpointsService.addTrendingPoint(bookId, 8);
    // Insert the book into the wishlist
    const insertQuery = `INSERT INTO wishlist (user_id, book_id) VALUES (?, ?)`;
    await db.execute(insertQuery, [userId, bookId]);

    res
      .status(201)
      .json({ message: "Book added to the wishlist successfully" });
  } catch (error) {
    console.error("Error adding book to wishlist:", error);
    res.status(500).json({
      message: "Server error while adding to wishlist",
      error: error.message,
    });
  }
};

const removeFromWishlist = async (userId, bookId) => {
  try {
    console.log("coming");
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
  postWishlistBook,
  removeFromWishlist,
  getBookid,
};
