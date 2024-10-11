const pool = require('../config/dbConfig'); // Import the database connection pool
const Book = require('../models/bookModel'); // Import the Book model

// exports.findBookById = async (bookId) => {
//   try {
//     const [rows] = await pool.execute('SELECT * FROM book WHERE book_id = ?', [bookId]);
//     return rows.length > 0 ? rows[0] : null;
//   } catch (error) {
//     console.error('Database error:', error);
//     throw new Error('Database error');
//   }
// };

// exports.addBook = async (bookData) => {
//   books.push(bookData);
//   return bookData;
// };

// Function to get book ID using ISBN10 or ISBN13
exports.getBookIdWithISBN = async (ISBN) => {
  try {
    // Query to fetch the book ID using ISBN10 or ISBN13
    const query = `SELECT book.book_id 
                   FROM book 
                   WHERE book.ISBN10 = ? OR book.ISBN13 = ?`;

    // Execute the query using ISBN for both ISBN10 and ISBN13 conditions
    const [results] = await pool.execute(query, [ISBN, ISBN]);

    // Map the results to create instances of the Book model using book_id
    return results.map(result => new Book(result.book_id));
  } catch (error) {
    // Log and throw an error if something goes wrong with the query
    console.error('Error fetching book Id:', error);
    throw new Error('Server error while fetching book Id');
  }
};

// Function to fetch full book details by its ID
exports.getBookById = async (bookId) => {
  try {
    // Query to select all details of a book based on the book ID
    const query = `SELECT * FROM book WHERE book.book_id = ?`;

    // Execute the query with the provided bookId
    const [result] = await pool.execute(query, [bookId]);

    // Return the result containing book details
    return result;
  } catch (error) {
    // Log and throw an error if something goes wrong with the query
    console.error('Error fetching book from the database:', error);
    throw error;
  }
};
