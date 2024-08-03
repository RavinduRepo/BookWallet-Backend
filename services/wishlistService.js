const db = require("../config/dbConfig");

exports.getWishlistByUserId = async (userId) => {
    try {
        const query = `
            SELECT b.title, b.ISBN10, b.ISBN13, b.publication_date, b.description, b.author, b.rating, b.genre, b.imageUrl
            FROM wishlist w
            JOIN book b ON w.book_id = b.book_id
            WHERE w.user_id = ?;
        `;
        const [rows] = await db.query(query, [userId]); // Destructure to get the rows array
        console.log('Database Query Result:', rows); // Log only the rows

        if (rows.length > 0) {
            return rows; // Return the rows directly
        } else {
            return []; // Return an empty array if no rows are found
        }
        
    } catch (error) {
        throw new Error('Error fetching wishlist: ' + error.message);
    }
};
