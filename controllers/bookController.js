const bookService = require('../services/bookService');
const Book = require('../models/bookModel');

exports.getBookWithId = async (req, res) => {
  try {
    const { bookId } = req.params;
    if (!bookId) {
      return res.status(400).json({ message: 'Book ID is required' });
    }
    const result = await bookService.getBookById(bookId);
    if (result.length === 0) {
      return res.status(400).json({ message: 'Book not found' });
    }
    const book = result.map(row => new Book(
      row.bookId,
      row.title,
      row.ISBN10,
      row.ISBN13,
      row.publication_date,
      row.description,
      row.author,
      row.rating,
      row.pages,
      row.genre,
      row.imageUrl,
      row.resource
    ));
    res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ message: 'Server error while fetching book' });
  }
};
