const db = require("../config/dbConfig"); // Import the Promise-based pool for database connection

const addBook = async (book) => {
  // Destructure the book object to extract its properties
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

    // SQL query to check if a book with the same ISBN10/ISBN13 and title already exists
    const checkBookSql = `
      SELECT book_id 
      FROM book 
      WHERE (ISBN10 = ? OR ISBN13 = ?) AND title = ?
    `;

    // Execute the query to check if the book exists
    const [checkBookRows] = await db.query(checkBookSql, [
      ISBN10, 
      ISBN13, 
      title
    ]);

    // If no rows are returned, the book doesn't exist, so we insert it
    if (checkBookRows.length === 0) {
      // SQL query to insert a new book into the database
      const insertBookSql = `
        INSERT INTO book (
          title, ISBN10, ISBN13, publication_date, description, 
          author, rating, pages, genre, imageUrl, resource
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      // Execute the query to insert the new book
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

      // Check if the insert operation was successful
      if (insertBookResult.affectedRows > 0) {
        // Get the newly inserted book's ID
        bookId = insertBookResult.insertId;
        return bookId;
      } else {
        throw new Error("Failed to insert the book.");
      }
    } else {
      // If the book already exists, return the existing book_id
      bookId = checkBookRows[0].book_id;
      return bookId;
    }
  } catch (err) {
    // Log the error and throw a custom error message
    console.error("Database error in addBook: ", err.message);
    throw new Error("Database error: " + err.message);
  }
};

module.exports = { addBook }; // Export the addBook function
