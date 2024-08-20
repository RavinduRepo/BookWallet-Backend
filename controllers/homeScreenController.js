const homeScreenService = require('../services/homeScreenService');

const getHomeScreen = async (req, res) => {
    const { userId } = req.params;
    const { page } = req.query;
    try {
        const { reviews, books, shares } = await homeScreenService.getHomeScreen(userId, parseInt(page));
        return res.status(200).json({ reviews, books, shares });
    } catch (error) {
        console.error('Error fetching reviews or books:', error);
        return res.status(500).json({ message: 'Failed to fetch reviews or books.' });
    }
}

module.exports = { getHomeScreen };
