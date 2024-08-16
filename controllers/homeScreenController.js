const homeScreenService = require('../services/homeScreenService');

const getHomeScreen = async (req, res) => {
    const { userId } = req.params;
    try {
        const { reviews, books } = await homeScreenService.getHomeScreen(userId);
        return res.status(200).json({ reviews, books });
    } catch (error) {
        console.error('Error fetching reviews or books:', error);
        return res.status(500).json({ message: 'Failed to fetch reviews or books.' });
    }
}

module.exports = { getHomeScreen };
