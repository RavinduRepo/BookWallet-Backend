// isInWishlistController.js

const isInWishlistService = require('../services/isInWishlistService');

const isInWishlistController = {
  async checkWishlist(req, res) {
    const { userId, bookId } = req.params;

    try {
      const exists = await isInWishlistService.checkWishlist(userId, bookId);
      console.log(exists);
      return res.json({ exists });
    } catch (error) {
      console.error('Error in isInWishlistController:', error);
      return res.status(500).json({ error: 'An error occurred while checking the wishlist.' });
    }
  }
};

module.exports = isInWishlistController;
