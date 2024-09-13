const db = require("../config/dbConfig");

const getTrendingBooks = async () => {
    try {
        const query = `
            SELECT b.title, b.ISBN10, b.ISBN13, b.publication_date, b.description, b.pages, b.author, b.rating, b.genre, b.imageUrl, b.resource
            FROM trending_books tb
            JOIN book b ON tb.book_id = b.book_id
            ORDER BY tb.place ASC;
        `;
        const [rows] = await db.query(query); // Destructure to get the rows array
        console.log('Trending Books Query Result:', rows);

        if (rows.length > 0) {
            return rows; // Return the list of trending books
        } else {
            return []; // Return an empty array if no trending books are found
        }
        
    } catch (error) {
        throw new Error('Error fetching trending books: ' + error.message);
    }
};

module.exports = {
    getTrendingBooks
};
