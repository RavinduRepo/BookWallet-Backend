const db = require('../config/dbConfig');
const Book = require('../models/bookModel');

const postRecommendBook = async (req, res) => {
    const { bookId, recommenderId } = req.params;

    if (!recommenderId || !bookId) {
        return res.status(400).json({ message: 'Recommender ID or Book ID is required' });
    }

    try {
        const getFollowerIdQuery = `SELECT follower_id FROM user_follows WHERE followed_id = ?`;
        const [followers] = await db.execute(getFollowerIdQuery, [recommenderId]);

        if (followers.length === 0) {
            return res.status(404).json({ message: 'No followers found for the given recommender ID' });
        }

        const insertRecommendationQuery = `INSERT INTO book_recommended (book_id, user_id, recommender_id) VALUES (?, ?, ?)`;
        const promises = followers.map(follower => {
            const userId = follower.follower_id;
            return db.execute(insertRecommendationQuery, [bookId, userId, recommenderId]);
        });

        const results = await Promise.all(promises);

        res.status(201).json({ message: 'Book recommended to the followers successfully'});
    } catch (error) {
        console.error('Error book recommending:', error);
        res.status(500).json({ message: 'Server error while recommending', error: error.message });
    }
};

module.exports = { postRecommendBook };


const getRecommendedBook = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const [rows] = await db.execute(
            `SELECT *
            FROM book
            INNER JOIN book_recommended  ON book.book_id = book_recommended.book_id
            WHERE book_recommended.user_id = ?;`,
            [userId]
        );
        const books = rows.map(row => new Book(
            row.bookId,
            row.title,
            row.ISBN10,
            row.ISBN13,
            row.publication_date,
            row.description,
            row.author,
            row.rating,
            row.pages,
            row.genre,
            row.imageUrl,
            row.resource
        ));
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error); // Log the actual error
        res.status(500).json({ error: 'Failed to fetch books' });
    }
};

module.exports = { postRecommendBook, getRecommendedBook }
