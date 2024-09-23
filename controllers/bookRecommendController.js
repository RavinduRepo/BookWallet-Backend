const recommendationService = require('../services/bookRecommendService');

const postRecommendBook = async (req, res) => {
    const { bookId, recommenderId } = req.params;
    const { token } = req.body;

    if (!recommenderId || !bookId) {
        return res.status(400).json({ message: 'Recommender ID or Book ID is required' });
    }

    try {
        const result = await recommendationService.recommendBook(bookId, recommenderId, token);
        if (result.error) {
            return res.status(result.status).json({ error: result.error });
        }
        res.status(201).json({ message: 'Book recommended to the followers successfully' });
    } catch (error) {
        console.error('Error book recommending:', error);
        res.status(500).json({ message: 'Server error while recommending', error: error.message });
    }
};

const getRecommendedBook = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const books = await recommendationService.getRecommendedBooks(userId);
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
};

module.exports = { postRecommendBook, getRecommendedBook };
