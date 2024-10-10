const recommendationService = require('../services/bookRecommendService');

// Controller to handle book recommendation to followers
const postRecommendBook = async (req, res) => {
    // Extract bookId and recommenderId from request parameters, and token from request body
    const { bookId, recommenderId } = req.params;
    const { token } = req.body;

    // Validate if both bookId and recommenderId are provided, return 400 if missing
    if (!recommenderId || !bookId) {
        return res.status(400).json({ message: 'Recommender ID or Book ID is required' });
    }

    try {
        // Call service to recommend the book to followers
        const result = await recommendationService.recommendBook(bookId, recommenderId, token);
        
        // If the service returns an error, respond with the appropriate error status and message
        if (result.error) {
            return res.status(result.status).json({ error: result.error });
        }
        
        // If successful, respond with a 201 status and success message
        res.status(201).json({ message: 'Book recommended to the followers successfully' });
    } catch (error) {
        // Log the error and return a 500 status with an error message for server errors
        console.error('Error book recommending:', error);
        res.status(500).json({ message: 'Server error while recommending', error: error.message });
    }
};

// Controller to fetch recommended books for a specific user
const getRecommendedBook = async (req, res) => {
    // Extract userId from request parameters
    const { userId } = req.params;

    // Validate if userId is provided, return 400 if missing
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        // Call service to get recommended books for the user
        const books = await recommendationService.getRecommendedBooks(userId);
        
        // Return the list of recommended books in JSON format
        res.json(books);
    } catch (error) {
        // Log the error and return a 500 status with an error message for server errors
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
};

// Export the controller functions
module.exports = { postRecommendBook, getRecommendedBook };
