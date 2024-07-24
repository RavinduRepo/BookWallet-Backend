const db = require('../config/dbConfig1');

const ReviewPost = async (req, res) => {
    try {
        const { review } = req.body; // Get content from request body
        const [result] = await db.execute(
            `INSERT INTO reviews (review) VALUES (?);`,
            [review]
        );
        
        // Fetch the inserted review using the insertId if needed, or return the insertId
        res.json({ review });
    } catch (error) {
        console.error('Error inserting review:', error); // Log the actual error
        res.status(500).json({ error: 'Failed to insert review' });
    }
};

module.exports = { ReviewPost };
