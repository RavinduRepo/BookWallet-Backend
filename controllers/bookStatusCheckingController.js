const bookStatusCheckingService = require("../services/bookStatusCheckingService");

const bookStatusCheckingController = {
  async checkBookStatus(req, res) {
    const { userId, bookId } = req.params;

    try {
      const { wishlistStatus, saveStatus } =
        await bookStatusCheckingService.checkBookStatus(userId, bookId);
      return res.json({ wishlistStatus, saveStatus });
    } catch (error) {
      console.error("Error in bookStatusCheckingController:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while checking the book status." });
    }
  },
};

module.exports = bookStatusCheckingController;
