// isInWishlistService.js

const db = require("../config/dbConfig");

const isInWishlistService = {
  async checkWishlist(userId, bookId) {
    try {
      const [rows] = await db.query(
        'SELECT COUNT(*) AS count FROM wishlist WHERE user_id = ? AND book_id = ?',
        [userId, bookId]
      );
      
      // `rows` is an array of objects, so we need to access the first element and then the `count` field
      const count = rows[0].count;
      return count > 0;
    } catch (error) {
      console.error('Error checking wishlist:', error);
      throw error;
    }
  }
};

module.exports = isInWishlistService;
