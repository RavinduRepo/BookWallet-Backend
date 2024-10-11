const db = require("../config/dbConfig"); // Import the Promise-based database pool

// Function to add or update a book rating
const addBookRatingService = async (review, book_id) => {
    const { user_id, rating } = review; // Destructure user_id and rating from the review object

    try {
        // Step 1: Check if the user exists in the 'user' table
        const checkUserSql = `SELECT user_id FROM user WHERE user_id = ?`; 
        const [checkUserRows] = await db.query(checkUserSql, [user_id]);

        // If no user is found with the provided user_id, throw an error
        if (checkUserRows.length === 0) {
            throw new Error("User does not exist");
        }

        // Step 2: Insert the rating or update the existing one
        // If a duplicate user_id and book_id combination exists, update the rating and weight
        const sql = `
            INSERT INTO book_rating (user_id, book_id, rating, weight)
            VALUES (?, ?, ?, 1)
            ON DUPLICATE KEY UPDATE 
                rating = VALUES(rating), 
                weight = VALUES(weight)
        `;

        // Execute the query to insert or update the book rating
        const [result] = await db.query(sql, [user_id, book_id, rating]);

        // Step 3: Return true if either an insert or update occurred
        // result.affectedRows > 0 means the operation was successful (insert or update)
        return result.affectedRows > 0;
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Database Error: ", error.message);

        // Throw a custom error message for the calling function to handle
        throw new Error("Failed to add or update book rating. Please try again later.");
    }
};

module.exports = { addBookRatingService }; // Export the service function for use in controllers
