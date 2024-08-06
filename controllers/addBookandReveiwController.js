const db = require("../config/dbConfig");
const { addReview } = require("../services/addReviewService");
const { addBook } = require("../services/addBookService");

const addBookAndReviewController = async (req, res) => {
  const { book, review } = req.body;
  console.log(req.body);

  if (!book || !review) {
    return res
      .status(400)
      .json({ message: "Book and review details are required" });
  }

  try {
    const bookId = await addBook(book);
    console.log(bookId);
    const result = await addReview(review, bookId);
    if (result) {
      res.status(201).json({ message: "Review added successfully" });
    } else {
      res.status(500).json({ message: "Failed to add book and review" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addBookAndReviewController };
