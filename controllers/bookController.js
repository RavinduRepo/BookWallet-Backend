const bookService = require('../services/bookService');
const Book = require('../models/bookModel');

exports.findBookById = async (req, res) => {
  const bookId = parseInt(req.params.id);

  try {
    const book = await bookService.findBookById(bookId);

    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Database error', error: error.message });
  }
};

exports.addBook = async (req, res) => {
  try {
    const newBook = req.body;
    const addedBook = await bookService.addBook(newBook);
    res.status(201).json(addedBook);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add book', error: error.message });
  }
};

exports.getBookIdWithISBN = async (req, res) => {
  try {
    const { ISBN } = req.params;

    if (!ISBN) {
      return res.status(400).json({ message: 'ISBN is required' });
    }

    const books = await bookService.getBookIdWithISBN(ISBN);

    if (books.length === 0) {
      return res.status(404).json({ message: 'Book Id not found' });
    }

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching book Id', error: error.message });
  }
};

exports.getBookById = async (req, res) => {
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
