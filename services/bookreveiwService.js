const db = require("../config/dbConfig"); // Import the Promise-based pool

const addBookAndReview = async (book, review) => {
  const {
    title,
    ISBN10,
    ISBN13,
    publication_date,
    description,
    author,
    rating,
    genre,
    imageUrl,
  } = book;

  const { user_id, context, rating: reviewRating, group_id } = review;

  try {
    let bookId;

    // Check if the book is already available
    const checkBookSql =
      "SELECT book_id FROM book WHERE (ISBN10 = ? OR ISBN13 = ?) AND title = ?"; //13 or 10 and title
    const [checkBookRows] = await db.query(checkBookSql, [
      ISBN10,
      ISBN13,
      title,
    ]);

    if (checkBookRows.length === 0) {
      // Book is not available, insert it
      const insertBookSql = `
        INSERT INTO book (title, ISBN10, ISBN13, publication_date, description, author, rating, genre,imageUrl)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const [insertBookResult] = await db.query(insertBookSql, [
        title,
        ISBN10,
        ISBN13,
        publication_date,
        description,
        author,
        rating,
        genre,
        imageUrl,
      ]);

      if (insertBookResult.affectedRows > 0) {
        // Get the newly inserted book_id
        bookId = insertBookResult.insertId;
      } else {
        throw new Error("Failed to insert the book.");
      }
    } else {
      // Book already exists, use the existing book_id
      bookId = checkBookRows[0].book_id;
    }

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

module.exports = { addBookAndReview };
