const homeScreenService = require('../services/homeScreenService');

// Controller function to fetch the home screen data for a user
const getHomeScreen = async (req, res) => {
    const { userId } = req.params;  // Extract userId from the request parameters
    const { page } = req.query;     // Extract page number from query parameters (for pagination)

    try {
        // Call the service to get the reviews, books, and shares for the home screen
        const { reviews, books, shares } = await homeScreenService.getHomeScreen(userId, parseInt(page));

        // Return the reviews, books, and shares in the response with a 200 OK status
        return res.status(200).json({ reviews, books, shares });
    } catch (error) {
        // Log the error in case fetching data fails
        console.error('Error fetching reviews or books:', error);

        // Return a 500 Internal Server Error response with a failure message
        return res.status(500).json({ message: 'Failed to fetch reviews or books.' });
    }
}

// Export the controller function
module.exports = { getHomeScreen };
