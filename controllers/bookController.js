const pool = require('../config/dbConfig'); // Adjust the path if necessary

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