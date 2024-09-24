const db = require("../config/dbConfig");

const bookStatusCheckingService = {
  async checkBookStatus(userId, bookId) {
    try {
      // Query to check if the book is in the wishlist
      const [wishlistRows] = await db.query(
        "SELECT COUNT(*) AS count FROM wishlist WHERE user_id = ? AND book_id = ?",
        [userId, bookId]
      );
      const wishlistStatus = wishlistRows[0].count > 0;

      // Query to check if the book is saved
      const [saveRows] = await db.query(
        `SELECT COUNT(*) AS count FROM saved WHERE user_id = ? AND relevant_id = ? AND save_index = 1`,
        [userId, bookId]
      );
      const saveStatus = saveRows[0].count > 0;

      // Return both wishlist and save statuses
      return { wishlistStatus, saveStatus };
    } catch (error) {
      console.error("Error checking book status:", error);
      throw error;
    }
  },
};

module.exports = bookStatusCheckingService;
