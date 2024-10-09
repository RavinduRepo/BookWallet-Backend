const db = require('../config/dbConfig');
const Book = require('../models/bookModel');
const authService = require('../services/authService');
const trendingpointsService = require("../services/trendingpointsService");

// Service to recommend a book to the followers of a user
const recommendBook = async (bookId, recommenderId, token) => {
    try {
        // Verify the token to ensure that the requester is authorized
        const decoded = await authService.verifyToken(token);
        const userIdToken = decoded.id.toString();

        // Check if the recommender ID from the token matches the given recommenderId
        if (userIdToken !== recommenderId) {
            return { status: 403, error: 'Unauthorized action' };  // Return unauthorized if they don't match
        }

        // Fetch the list of followers for the recommender
        const getFollowerIdQuery = `SELECT follower_id FROM user_follows WHERE followed_id = ?`;
        const [followers] = await db.execute(getFollowerIdQuery, [recommenderId]);

        // If no followers are found, return a 404 status
        if (followers.length === 0) {
            return { status: 404, error: 'No followers found for the given recommender ID' };
        }

        // Add trending points to the book as part of the recommendation
        await trendingpointsService.addTrendingPoint(bookId, 40);

        // Insert a recommendation for each follower into the `book_recommended` table
        const insertRecommendationQuery = `INSERT INTO book_recommended (book_id, user_id) VALUES (?, ?)`;
        const promises = followers.map(follower => {
            const userId = follower.follower_id;
            return db.execute(insertRecommendationQuery, [bookId, userId]);  // Insert recommendation for each follower
        });

        // Wait for all database insertions to complete
        await Promise.all(promises);

        return { status: 201 };  // Return success status when all recommendations are inserted
    } catch (error) {
        // Catch and throw any errors encountered during the process
        throw new Error('Error recommending book: ' + error.message);
    }
};

// Service to get the books recommended to a user
const getRecommendedBooks = async (userId) => {
    try {
        // Query to get the distinct books recommended to the user by their followers
        const [rows] = await db.execute(
            `SELECT DISTINCT book.*
            FROM book
            INNER JOIN book_recommended ON book.book_id = book_recommended.book_id
            INNER JOIN user_follows ON book_recommended.user_id = user_follows.followed_id
            WHERE user_follows.follower_id = ${userId};`
        );

        // If no recommended books are found, return an empty array
        if (rows.length === 0) {
            return [];
        }

        // Map the fetched rows to Book objects
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

        // Return the array of Book objects
        return books;
    } catch (error) {
        // Catch and throw any errors encountered while fetching the recommended books
        throw new Error('Error fetching recommended books: ' + error.message);
    }
};

// Export the service functions
module.exports = { recommendBook, getRecommendedBooks };
