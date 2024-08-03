const wishlistService = require('../services/wishlistService');

exports.getWishlistByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const wishlistBooks = await wishlistService.getWishlistByUserId(userId);
        
        console.log('Wishlist Books:', wishlistBooks); // This should now log the correct data

        if (wishlistBooks.length > 0) {
            return res.status(200).json(wishlistBooks);
        } else {
            return res.status(200).json({ message: 'No wishlist found for this user.' });
        }
        
    } catch (error) {
        console.error('Error retrieving wishlist:', error);
        res.status(500).json({ message: 'Error retrieving wishlist', error: error.message });
    }
};
