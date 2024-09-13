const db = require("../config/dbConfig");
const { addReview } = require("../services/addReviewService");
const { addBook } = require("../services/addBookService");
const authService = require("../services/authService");
const trendingpointsService = require("../services/trendingpointsService");

const addBookAndReviewController = async (req, res) => {
  console.log("Received request at addBookAndReviewController");

  const { book, review, token } = req.body;

  // Check if both book and review details are provided
  if (!book || !review) {
    return res
      .status(400)
      .json({ message: "Book and review details are required" });
  }

  try {
    // Verify the token to get the user ID
    const decoded = await authService.verifyToken(token);
    const userIdToken = decoded.id.toString();

    // Check if the user ID from the token matches the review's user ID
    const userId = review.user_id.toString();
    console.log("User ID from token: ", userIdToken);
    console.log("User ID from review: ", userId);

    if (userIdToken !== userId) {
      return res.status(403).json({ error: "Unauthorized action" });
    }

    // Add the book to the database
    const bookId = await addBook(book);

    await trendingpointsService.addTrendingPoint(bookId,50);
    // Add the review to the database
    const result = await addReview(review, bookId);

    // Check if the review was added successfully
    if (result) {
      res.status(201).json({ message: "Book and review added successfully" });
    } else {
      res.status(500).json({ message: "Failed to add book and review" });
    }
  } catch (error) {
    console.error("Error adding book and review: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addBookAndReviewController };
