const bookService = require('../services/bookService');

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
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ message: 'Server error while fetching book' });
  }
};
