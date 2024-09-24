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

        // Fetch all followers of the recommender
        const getFollowerIdQuery = `SELECT follower_id FROM user_follows WHERE followed_id = ?`;
        const [followers] = await db.execute(getFollowerIdQuery, [recommenderId]);

        if (followers.length === 0) {
            return { status: 404, error: 'No followers found for the given recommender ID' };
        }

        // Add trending points when the book is recommended
        await trendingpointsService.addTrendingPoint(bookId, 40);

        // Insert the recommendation for each follower into the `book_recommended` table
        const insertRecommendationQuery = `INSERT INTO book_recommended (book_id, user_id) VALUES (?, ?)`;
        const promises = followers.map(follower => {
            const userId = follower.follower_id;
            return db.execute(insertRecommendationQuery, [bookId, userId]);
        });

        await Promise.all(promises);
        return { status: 201 };
    } catch (error) {
        throw new Error('Error recommending book: ' + error.message);
    }
};

const getRecommendedBooks = async (userId) => {
    try {
        // Fetch books recommended to the current user by the users they are following in one query
        const [rows] = await db.execute(
            `SELECT DISTINCT book.*
            FROM book
            INNER JOIN book_recommended ON book.book_id = book_recommended.book_id
            INNER JOIN user_follows ON book_recommended.user_id = user_follows.followed_id
            WHERE user_follows.follower_id = ${userId};`
        );

        if (rows.length === 0) {
            return [];
        }

        // Map the result into Book objects
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
