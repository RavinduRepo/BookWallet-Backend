const db = require('../config/dbConfig');
const Post = require('../models/postModel');

const getPosts = async (req, res) => {
    try {
        const [rows] = await db.execute(
            `SELECT reviewed.context, reviewed.rating, user.username, book.title, book.author, book.imageUrl
            FROM reviewed
            INNER JOIN user ON reviewed.user_id = user.user_id
            INNER JOIN book ON reviewed.book_id = book.book_id;`
        );
        const posts = rows.map(row => new Post(
            row.imageUrl,
            row.title,
            row.author,
            row.context,
            row.rating,
            row.username,
        ));
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error); // Log the actual error
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};

module.exports = { getPosts };
