const db = require('../config/dbConfig');
const Book = require('../models/bookModel');
const authService = require('../services/authService');
const trendingpointsService = require("../services/trendingpointsService");

const recommendBook = async (bookId, recommenderId, token) => {
    try {
        const decoded = await authService.verifyToken(token);
        const userIdToken = decoded.id.toString();
        if (userIdToken !== recommenderId) {
            return { status: 403, error: 'Unauthorized action' };
        }

        const getFollowerIdQuery = `SELECT follower_id FROM user_follows WHERE followed_id = ?`;
        const [followers] = await db.execute(getFollowerIdQuery, [recommenderId]);

        if (followers.length === 0) {
            return { status: 404, error: 'No followers found for the given recommender ID' };
        }

        // Add trending points when the book is recommended
        await trendingpointsService.addTrendingPoint(bookId, 40);

        const insertRecommendationQuery = `INSERT INTO book_recommended (book_id, user_id, recommender_id) VALUES (?, ?, ?)`;
        const promises = followers.map(follower => {
            const userId = follower.follower_id;
            return db.execute(insertRecommendationQuery, [bookId, userId, recommenderId]);
        });

        await Promise.all(promises);
        return { status: 201 };
    } catch (error) {
        throw new Error('Error recommending book: ' + error.message);
    }
};

const getRecommendedBooks = async (userId) => {
    try {
        const [rows] = await db.execute(
            `SELECT *
            FROM book
            INNER JOIN book_recommended ON book.book_id = book_recommended.book_id
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

        return books;
    } catch (error) {
        throw new Error('Error fetching recommended books: ' + error.message);
    }
};

module.exports = { recommendBook, getRecommendedBooks };
