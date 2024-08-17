const db = require("../config/dbConfig");
const Post = require("../models/postModel");
const Book = require("../models/bookModel");

const getHomeScreen = async (userId) => {
    try {
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
            user.username`;
 
        const [rows_review] = await db.execute(query_reviews);
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
        // boooks
        const query_books = `SELECT * FROM book`;
        const [rows_book] = await db.execute(query_books);
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
        return { reviews, books} ;
        // return books;
        // return reviews;
    } catch {
        console.log('Error fetching reviews or books from database', error);
        throw error;
    }
}

module.exports = { getHomeScreen };
