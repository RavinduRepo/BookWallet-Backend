const pool = require('../config/dbConfig'); // Adjust the path if necessary
const Book = require('../models/bookModel');

exports.findBook = async (req, res) => {
  const bookId = parseInt(req.params.id);

  try {
    const [rows] = await pool.execute('SELECT * FROM book WHERE book_id = ?', [bookId]);
    
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Database error', error: err });
  }
};
  
//module.exports = router;

exports.addBook = async (req, res) => {
  const newBook = req.body;
  books.push(newBook);
  res.status(201).json(newBook);
};

exports.getBookIdWithISBN = async (req, res) => {
  try {
    const { ISBN } = req.params;

    if (!ISBN) {
      return res.status(400).json({ message: 'ISBN is required'});
    }

    const query = `SELECT book.book_id 
                    FROM book 
                    WHERE book.ISBN10 = ? OR book.ISBN13 = ?`;

    const [results] = await pool.execute(query, [ISBN, ISBN]);

    if (results.length == 0) {
      return res.status(404).json({ message: 'Book Id not found'});
    }

    const books = results.map(result => new Book(
      result.book_id,
  ));

  res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching book Id:', error);
    res.status(500).json({ message: 'Server error while fetching book Id' });
  }
};

exports.getBookById = async (bookId) => {
  try {
    const query = `SELECT * FROM book WHERE book.book_id = ?`;
    const [result] = await pool.execute(query, [bookId]);
    return result;
  } catch (error) {
    console.error('Error fetching book from the database:', error);
    throw error;
  }
};
