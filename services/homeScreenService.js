const db = require("../config/dbConfig");
const Post = require("../models/postModel");
const Book = require("../models/bookModel");
const Share = require("../models/shareModel");

const getHomeScreen = async (userId, page) => {
    try {
        const limit = 10;
        const offset = (page - 1) * limit;
        // reviews
        const query_reviews = 
        `SELECT reviewed.review_id, 
            reviewed.book_id, 
            reviewed.user_id, 
            book.imageUrl, 
            book.title, 
            book.author, 
            reviewed.context, 
            reviewed.rating, 
            reviewed.date,
            user.username,
        COUNT(DISTINCT likes.user_id) AS likesCount,
        COUNT(DISTINCT comments.comment_id) AS commentsCount,
        COUNT(DISTINCT shares.share_id) AS sharesCount
        FROM reviewed
        INNER JOIN user ON reviewed.user_id = user.user_id
        INNER JOIN book ON reviewed.book_id = book.book_id
        LEFT JOIN likes ON likes.review_id = reviewed.review_id
        LEFT JOIN comments ON comments.review_id = reviewed.review_id
        LEFT JOIN shares ON shares.review_id = reviewed.review_id
        GROUP BY reviewed.review_id, 
            reviewed.book_id, 
            reviewed.user_id, 
            book.imageUrl, 
            book.title, 
            book.author, 
            reviewed.context, 
            reviewed.rating, 
            reviewed.date, 
            user.username
        LIMIT ? OFFSET ?`;
 
        const [rows_review] = await db.execute(query_reviews, [limit, offset]);
        const reviews = rows_review.map(row_review => new Post(
            row_review.review_id,
            row_review.book_id,
            row_review.user_id,
            row_review.imageUrl,
            row_review.title,
            row_review.author,
            row_review.context,
            row_review.rating,
            row_review.date,
            row_review.username,
            row_review.likesCount,
            row_review.commentsCount,
            row_review.sharesCount,
        ));
        // books
        const query_books = `SELECT * FROM book LIMIT ? OFFSET ?`;
        const [rows_book] = await db.execute(query_books, [limit, offset]);
        const books = rows_book.map(row_book => new Book(
            row_book.bookId,
            row_book.title,
            row_book.ISBN10,
            row_book.ISBN13,
            row_book.publication_date,
            row_book.description,
            row_book.author,
            row_book.rating,
            row_book.pages,
            row_book.genre,
            row_book.imageUrl,
            row_book.resource,
        ));
        // shares
        const query_shareReviews1 = `SELECT shares.review_id, user.username AS sharerUsername, shares.user_id AS sharerUserId FROM shares INNER JOIN user ON user.user_id = shares.user_id`;
        const [ sharedReviews1 ] = await db.query(query_shareReviews1);
        const sharedReviewIds = sharedReviews1.map(row => row.review_id);
        if (sharedReviewIds.length > 0) {
            const query_shareReviews2 = 
            `SELECT reviewed.review_id, 
                reviewed.book_id, 
                reviewed.user_id, 
                book.imageUrl, 
                book.title, 
                book.author, 
                reviewed.context, 
                reviewed.rating, 
                reviewed.date,
                user.username,
                COUNT(DISTINCT likes.user_id) AS likesCount,
                COUNT(DISTINCT comments.comment_id) AS commentsCount,
                COUNT(DISTINCT shares.share_id) AS sharesCount
            FROM reviewed
            INNER JOIN user ON reviewed.user_id = user.user_id
            INNER JOIN book ON reviewed.book_id = book.book_id
            LEFT JOIN likes ON likes.review_id = reviewed.review_id
            LEFT JOIN comments ON comments.review_id = reviewed.review_id
            INNER JOIN shares ON reviewed.review_id = shares.review_id
            WHERE reviewed.review_id IN (${sharedReviewIds.join(',')})
            GROUP BY reviewed.review_id, 
                reviewed.book_id, 
                reviewed.user_id, 
                book.imageUrl, 
                book.title, 
                book.author, 
                reviewed.context, 
                reviewed.rating, 
                reviewed.date, 
                user.username
            LIMIT ? OFFSET ?`;
            const [sharedReviews2] = await db.execute(query_shareReviews2, [limit, offset]);
            const shares = sharedReviews2.map(row => {
                const shareDetails = sharedReviews1.find(share => share.review_id === row.review_id);
                const reviews = new Post(
                    row.review_id,
                    row.book_id,
                    row.user_id,
                    row.imageUrl,
                    row.title,
                    row.author,
                    row.context,
                    row.rating,
                    row.date,
                    row.username,
                    row.likesCount,
                    row.commentsCount,
                    row.sharesCount,
                );
                return new Share(
                    row.review_id,
                    shareDetails.sharerUsername,
                    reviews,
                    shareDetails.sharerUserId,
                    'image path',
                );
            });
            return { reviews, books, shares};
        }
    } catch(err) {
        console.log('Error fetching reviews or books or shares from database', err);
        throw err;
    }
}

module.exports = { getHomeScreen };
