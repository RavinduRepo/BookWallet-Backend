const wishlistService = require('../services/wishlistService');

exports.getWishlistByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const wishlistBooks = await wishlistService.getWishlistByUserId(userId);
        
        console.log('Wishlist Books:', wishlistBooks); // This should  now log the correct data

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
exports.addToWishlist = async (req, res) => {
    try {
        const userId = req.body.user_id;
        const isbn = req.body.book_id; // ISBN is passed in book_id field

        if (!userId || !isbn) {
            return res.status(400).json({ message: 'User ID and ISBN are required' });
        }

        // Fetch the book_id using the ISBN
        const bookIdResult = await wishlistService.getBookIdWithISBN(isbn);

        if (bookIdResult.length === 0) {
            return res.status(404).json({ message: 'Book not found for the provided ISBN' });
        }

        const bookId = bookIdResult[0].book_id; // Assuming `book_id` is in the first element of the result

        // Now add the book_id to the wishlist
        await wishlistService.addToWishlist(userId, bookId);

        return res.status(200).json({ message: 'Book added to wishlist successfully' });
        
    } catch (error) {
        console.error('Error adding book to wishlist:', error);
        res.status(500).json({ message: 'Server error while adding book to wishlist', error: error.message });
    }
};
exports.removeFromWishlist = async (req, res) => {
    try {
        const { userId, bookId } = req.params;

        if (!userId || !bookId) {
            return res.status(400).json({ message: 'User ID and Book ID are required' });
        }

        const result = await wishlistService.removeFromWishlist(userId, bookId);

        return res.status(200).json(result);
    } catch (error) {
        console.error('Error removing book from wishlist:', error);
        res.status(500).json({ message: 'Server error while removing book from wishlist', error: error.message });
    }

};
exports.getBookIdforwishlist = async (req, res) => {
        const { book } = req.body;
    
        if (!book) {
            return res
              .status(400)
              .json({ message: "Book details are required" });
        }
    
        try {
            const bookId = await wishlistService.getBookid(book);
            console.log(bookId);
        res.status(200).json({ bookId });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
