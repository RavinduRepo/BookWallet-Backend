const savedItemsService = require("../services/savedItemsService");
const authService = require("../services/authService");

class SavedItemsController {
  async getSavedReviewsByUserId(req, res) {
    try {
      const { userId } = req.params;
      const reviewsWithIndex = await savedItemsService.getSavedReviewsByUserId(
        userId
      );

      const response = reviewsWithIndex.map(({ post }) => ({
        post,
      }));

      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching saved reviews" });
    }
  }

  async getSavedBooksByUserId(req, res) {
    try {
      const { userId } = req.params;
      const booksWithIndex = await savedItemsService.getSavedBooksByUserId(
        userId
      );

      const response = booksWithIndex.map(({ book }) => ({
        book,
      }));

      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching saved books" });
    }
  }

  async getSavedProfilesByUserId(req, res) {
    try {
      const { userId } = req.params;
      const userDetails = await savedItemsService.getSavedProfilesByUserId(
        userId
      );
      res.status(200).json(userDetails);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching saved profiles" });
    }
  }

  async insertSavedReview(req, res) {
    const { token, relevant_id } = req.body;
    try {
      const decoded = await authService.verifyToken(token);
      const loggedInUserId = decoded.id;
      await savedItemsService.insertSavedReview(loggedInUserId, relevant_id);
      res.status(200).json({ message: "Saved review successfully inserted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async insertSavedBook(req, res) {
    const { token, relevant_id } = req.body;
    try {
      const decoded = await authService.verifyToken(token);
      const loggedInUserId = decoded.id;
      await savedItemsService.insertSavedBook(loggedInUserId, relevant_id);
      res.status(200).json({ message: "Saved book successfully inserted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async insertSavedProfile(req, res) {
    const { token, relevant_id } = req.body;
    try {
      const decoded = await authService.verifyToken(token);
      const loggedInUserId = decoded.id;
      await savedItemsService.insertSavedProfile(loggedInUserId, relevant_id);
      res.status(200).json({ message: "Saved profile successfully inserted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async removeSavedReview(req, res) {
    const { token, relevant_id } = req.body;
    try {
      const decoded = await authService.verifyToken(token);
      const loggedInUserId = decoded.id;
      await savedItemsService.removeSavedReview(loggedInUserId, relevant_id);
      res.status(200).json({ message: "Saved review successfully removed" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async removeSavedBook(req, res) {
    const { token, relevant_id } = req.body;
    try {
      const decoded = await authService.verifyToken(token);
      const loggedInUserId = decoded.id;
      await savedItemsService.removeSavedBook(loggedInUserId, relevant_id);
      res.status(200).json({ message: "Saved book successfully removed" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async removeSavedProfile(req, res) {
    const { token, relevant_id } = req.body;
    try {
      const decoded = await authService.verifyToken(token);
      const loggedInUserId = decoded.id;
      await savedItemsService.removeSavedProfile(loggedInUserId, relevant_id);
      res.status(200).json({ message: "Saved profile successfully removed" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async isReviewSaved(req, res) {
    const { token, relevant_id } = req.body;
    try {
      const decoded = await authService.verifyToken(token);
      const loggedInUserId = decoded.id;
      const isSaved = await savedItemsService.isReviewSavedByUser(
        loggedInUserId,
        relevant_id
      );
      res.status(200).json({ isSaved });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async isBookSaved(req, res) {
    const { token, relevant_id } = req.body;
    try {
      const decoded = await authService.verifyToken(token);
      const loggedInUserId = decoded.id;
      const isSaved = await savedItemsService.isBookSavedByUser(
        loggedInUserId,
        relevant_id
      );
      res.status(200).json({ isSaved });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async isProfileSaved(req, res) {
    const { token, relevant_id } = req.body;
    try {
      const decoded = await authService.verifyToken(token);
      const loggedInUserId = decoded.id;
      const isSaved = await savedItemsService.isProfileSavedByUser(
        loggedInUserId,
        relevant_id
      );
      res.status(200).json({ isSaved });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new SavedItemsController();
