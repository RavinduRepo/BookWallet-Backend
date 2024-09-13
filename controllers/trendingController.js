const trendingService = require('../services/trendingService');

const getTrendingBooks = async (req, res) => {
    try {
        const trendingBooks = await trendingService.getTrendingBooks();
        res.status(200).json(trendingBooks); // Return the trending books as a JSON response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTrendingBooks
};
