const bookService = require('../services/bookService');
const Book = require('../models/bookModel');

// exports.findBookById = async (req, res) => {
//   const bookId = parseInt(req.params.id);
//   try {
//     const book = await bookService.findBookById(bookId);
//     if (book) {
//       res.json(book);
//     } else {
//       res.status(404).json({ message: 'Book not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Database error', error: error.message });
//   }
// };

// exports.addBook = async (req, res) => {
//   try {
//     const newBook = req.body;
//     const addedBook = await bookService.addBook(newBook);
//     res.status(201).json(addedBook);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to add book', error: error.message });
//   }
// };

// Controller to fetch book ID using ISBN (either ISBN10 or ISBN13)
exports.getBookIdWithISBN = async (req, res) => {
  try {
    const { ISBN } = req.params; // Extract ISBN from request parameters

    // Check if ISBN is provided in the request
    if (!ISBN) {
      return res.status(400).json({ message: 'ISBN is required' });
    }

    // Call bookService to get the book ID using ISBN
    const books = await bookService.getBookIdWithISBN(ISBN);

    // If no book is found, return a 404 error
    if (books.length === 0) {
      return res.status(404).json({ message: 'Book Id not found' });
    }

    // Return the book ID in the response
    res.status(200).json(books);
  } catch (error) {
    // Log and return a 500 server error if there's an issue
    res.status(500).json({ message: 'Server error while fetching book Id', error: error.message });
  }
};

// Controller to fetch a book by its ID
exports.getBookById = async (req, res) => {
  try {
    const { bookId } = req.params; // Extract bookId from request parameters

    // Check if bookId is provided in the request
    if (!bookId) {
      return res.status(400).json({ message: 'Book ID is required' });
    }

    // Call bookService to get the book details by ID
    const result = await bookService.getBookById(bookId);

    // If no book is found, return a 404 error
    if (result.length === 0) {
      return res.status(400).json({ message: 'Book not found' });
    }

    // Map the result rows to create an instance of the Book model
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

    // Return the book object in the response
    res.status(200).json(book);
  } catch (error) {
    // Log the error and return a 500 server error if there's an issue
    console.error('Error fetching book:', error);
    res.status(500).json({ message: 'Server error while fetching book' });
  }
};
