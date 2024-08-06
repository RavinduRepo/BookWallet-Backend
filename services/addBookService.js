const db = require("../config/dbConfig"); // Import the Promise-based pool

const addBook = async (book) => {
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
        INSERT INTO book (title, ISBN10, ISBN13, publication_date, description, author, rating, pages, genre, imageUrl,resource)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const [insertBookResult] = await db.query(insertBookSql, [
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
      ]);

      if (insertBookResult.affectedRows > 0) {
        // Get the newly inserted book_id
        bookId = insertBookResult.insertId;
        return bookId;
      } else {
        throw new Error("Failed to insert the book.");
      }
    } else {
      // Book already exists, use the existing book_id
      bookId = checkBookRows[0].book_id;
      return bookId;
    }
    } catch (err) {
    console.error("Database error in addBookAndReview: ", err.message);
    throw new Error("Database error: " + err.message);
    }
}

module.exports = { addBook };