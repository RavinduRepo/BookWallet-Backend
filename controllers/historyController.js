const historyService = require("../services/historyService");
const authService = require("../services/authService");

class HistoryController {
  async getReviewsByUserId(req, res) {
    try {
      const { userId } = req.params;
      const postsWithIndex = await historyService.getReviewsByUserId(userId);

      const response = postsWithIndex.map(({ post, searchIndex }) => ({
        searchIndex,
        post,
      }));

      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching reviews" });
    }
  }

  async getBooksByUserId(req, res) {
    try {
      const { userId } = req.params;
      const booksWithIndex = await historyService.getBooksByUserId(userId);

      const response = booksWithIndex.map(({ book, searchIndex }) => ({
        searchIndex,
        book,
      }));

      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while fetching books" });
    }
  }
  async getUserDetailsByUserId(req, res) {
    try {
      const { userId } = req.params;
      const userDetails = await historyService.getUserDetailsByUserId(userId);
      res.status(200).json(userDetails);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching user details" });
    }
  }
  async getAllItems(req, res) {
    try {
      const { userId } = req.params;
      const allItems = await historyService.getAllItems(userId);
      res.status(200).json(allItems);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching all items" });
    }
  }

  async insertReviewHistory(req, res) {
    const { token, relevant_id } = req.body;
    try {
      const decoded = await authService.verifyToken(token);
      const loggedInUserId = decoded.id;
      await historyService.insertReviewHistory(loggedInUserId, relevant_id);
      res.status(200).json({ message: "Review History inserted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async insertBookHistory(req, res) {
    const { token, relevant_id } = req.body;
    console.log(token);
    try {
      const decoded = await authService.verifyToken(token);
      const loggedInUserId = decoded.id;
      await historyService.insertBookHistory(loggedInUserId, relevant_id);
      res.status(200).json({ message: "Book History inserted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
module.exports = new HistoryController();
