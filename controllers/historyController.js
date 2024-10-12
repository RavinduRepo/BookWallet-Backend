const historyService = require("../services/historyService");
const authService = require("../services/authService");
const trendingpointsService = require("../services/trendingpointsService");

class HistoryController {
  // Fetch reviews posted by a specific user
  async getReviewsByUserId(req, res) {
    try {
      const { userId } = req.params; // Extract user ID from the request URL
      const postsWithIndex = await historyService.getReviewsByUserId(userId); // Get reviews from history service

      // Prepare the response by mapping posts to include searchIndex
      const response = postsWithIndex.map(({ post, searchIndex }) => ({
        searchIndex,
        post,
      }));

      // Send the successful response with the fetched reviews
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      // Handle and send error if an issue occurs
      res
        .status(500)
        .json({ error: "An error occurred while fetching reviews" });
    }
  }

  // Fetch books added by a specific user
  async getBooksByUserId(req, res) {
    try {
      const { userId } = req.params; // Extract user ID from the request URL
      const booksWithIndex = await historyService.getBooksByUserId(userId); // Get books from history service

      // Prepare the response by mapping books to include searchIndex
      const response = booksWithIndex.map(({ book, searchIndex }) => ({
        searchIndex,
        book,
      }));

      // Send the successful response with the fetched books
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      // Handle and send error if an issue occurs
      res.status(500).json({ error: "An error occurred while fetching books" });
    }
  }

  // Fetch user details by user ID
  async getUserDetailsByUserId(req, res) {
    try {
      const { userId } = req.params; // Extract user ID from the request URL
      const userDetails = await historyService.getUserDetailsByUserId(userId); // Get user details from history service

      // Send the successful response with the fetched user details
      res.status(200).json(userDetails);
    } catch (error) {
      console.error(error);
      // Handle and send error if an issue occurs
      res
        .status(500)
        .json({ error: "An error occurred while fetching user details" });
    }
  }

  // Fetch all items (reviews and books) associated with a specific user
  async getAllItems(req, res) {
    try {
      const { userId } = req.params; // Extract user ID from the request URL
      const allItems = await historyService.getAllItems(userId); // Get all items from history service

      // Send the successful response with the fetched items
      res.status(200).json(allItems);
    } catch (error) {
      console.error(error);
      // Handle and send error if an issue occurs
      res
        .status(500)
        .json({ error: "An error occurred while fetching all items" });
    }
  }

  // Insert review history for the logged-in user
  async insertReviewHistory(req, res) {
    const { token, relevant_id } = req.body; // Extract token and relevant review ID from the request body
    try {
      const decoded = await authService.verifyToken(token); // Verify the token to get the logged-in user ID
      const loggedInUserId = decoded.id;

      // Insert review history for the logged-in user
      await historyService.insertReviewHistory(loggedInUserId, relevant_id);

      // Send success response after successfully inserting the review history
      res.status(200).json({ message: "Review History inserted successfully" });
    } catch (error) {
      // Handle and send error if token verification or insertion fails
      res.status(500).json({ message: error.message });
    }
  }

  // Insert book history for the logged-in user
  async insertBookHistory(req, res) {
    const { token, relevant_id } = req.body; // Extract token and relevant book ID from the request body
    try {
      const decoded = await authService.verifyToken(token); // Verify the token to get the logged-in user ID
      const loggedInUserId = decoded.id;

      // Insert book history for the logged-in user
      await historyService.insertBookHistory(loggedInUserId, relevant_id);

      // Add a trending point for the book being added to history
      await trendingpointsService.addTrendingPoint(relevant_id, 1);

      // Send success response after successfully inserting the book history
      res.status(200).json({ message: "Book History inserted successfully" });
    } catch (error) {
      // Handle and send error if token verification or insertion fails
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new HistoryController();
