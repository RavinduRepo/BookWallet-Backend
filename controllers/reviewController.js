const sequelize = require('../config/dbConfig2');

// Review controller to fetch review details by review ID
const getReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        if (!reviewId) {
            return res.status(400).json({ message: 'Review ID is required' });
        }

        const query = `SELECT * FROM reviewed WHERE review_id = :reviewId`;
        const [reviewDetails] = await sequelize.query(query, {
            replacements: { reviewId },
            type: sequelize.QueryTypes.SELECT
        });

        if (!reviewDetails) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json({ reviewDetails });
    } catch (error) {
        console.error('Error fetching review details:', error);
        res.status(500).json({ message: 'Server error while fetching review details' });
    }
};

module.exports = { getReview };
