const db = require("../config/dbConfig");  

const trendingpointsService = {
  async addTrendingPoint(bookId, point_value) {
    try {
      const currentDate = new Date().toISOString().slice(0, 10); // Get the current date

      // Check if there is a row with the current time_index = 1
      const [rows] = await db.execute('SELECT points FROM trending_book_points WHERE book_id = ? AND time_index = 1', [bookId]);
      
      if (rows.length > 0) {
        // If exists, update the points for today (time_index = 1)
        const updateQuery = 'UPDATE trending_book_points SET points = points + ? WHERE book_id = ? AND time_index = 1';
        await db.execute(updateQuery, [point_value, bookId]);
      } else {
        // If not, insert a new row with time_index = 1 for today
        const insertQuery = 'INSERT INTO trending_book_points (book_id, points, time_index) VALUES (?, ?, 1)';
        await db.execute(insertQuery, [bookId, point_value]);
      }
      
      console.log(`Trending point added for book_id: ${bookId}`);
    } catch (error) {
      console.error('Error adding trending point:', error.message);
      throw error;
    }
  },

  async addTrendingPointFromReview(reviewId, point_value) {
    try {
        // Query to get book_id from the reviewed table using reviewId
        const [reviewResult] = await db.execute('SELECT book_id FROM reviewed WHERE review_id = ?', [reviewId]);
        
        if (reviewResult.length === 0) {
            throw new Error(`No book found for review_id: ${reviewId}`);
        }
        
        const bookId = reviewResult[0].book_id;
        console.log('Book ID from review:', bookId);

        // Check if there is an entry for the current day (time_index = 1)
        const [rows] = await db.execute(
            'SELECT points FROM trending_book_points WHERE book_id = ? AND time_index = 1', 
            [bookId]
        );
        console.log('Existing Entry for today:', rows);
        
        if (rows.length > 0) {
            // If entry exists for today, update the points by incrementing it
            const updateQuery = 'UPDATE trending_book_points SET points = points + ? WHERE book_id = ? AND time_index = 1';
            console.log('Executing:', updateQuery);
            await db.execute(updateQuery, [point_value, bookId]);
        } else {
            // If no entry for today, insert a new entry with time_index = 1 and the given points
            const insertQuery = 'INSERT INTO trending_book_points (book_id, points, time_index) VALUES (?, ?, 1)';
            console.log('Executing:', insertQuery);
            await db.execute(insertQuery, [bookId, point_value]);
        }

        console.log(`Trending point added for book_id: ${bookId}`);
    } catch (error) {
        console.error('Error adding trending point:', error.message);
        throw error;
    }
}
  };
  
  module.exports = trendingpointsService;
  
  

