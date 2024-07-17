const db = require('../config/dbConfig');

const getReviewWithId = async (req, res) => {
    try {
        const { reviewId } = req.params;

        if (!reviewId) {
            return res.status(400).json({ message: 'Review ID is required' });
        }

        const query = `
            SELECT reviewed.*, user.username, book.title, book.author
            FROM reviewed
            INNER JOIN user ON reviewed.user_id = user.user_id
            INNER JOIN book ON reviewed.book_id = book.book_id
            WHERE reviewed.review_id = ?
        `;

        const [reviewDetails] = await db.execute(query, [reviewId]);

        if (reviewDetails.length === 0) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json({ reviewDetails });
    } catch (error) {
        console.error('Error fetching review details:', error);
        res.status(500).json({ message: 'Server error while fetching review details' });
    }
};

const getReviews = async (req, res) => {
    try {
        const query = `
            SELECT reviewed.*, user.username, book.title, book.author
            FROM reviewed
            INNER JOIN user ON reviewed.user_id = user.user_id
            INNER JOIN book ON reviewed.book_id = book.book_id
        `;

        const [reviewDetails] = await db.execute(query);

        if (reviewDetails.length === 0) {
            return res.status(404).json({ message: 'No reviews found' });
        }

        res.status(200).json({ reviewDetails });
    } catch (error) {
        console.error('Error fetching review details:', error);
        res.status(500).json({ message: 'Server error while fetching review details' });
    }
};

module.exports = { getReviewWithId, getReviews };
