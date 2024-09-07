const db = require("../config/dbConfig");  

const trendingpointsService = {
    async addTrendingPoint(bookId) {
      try {
        // Perform the SELECT query
        const [rows] = await db.execute('SELECT points FROM trending_book_points WHERE book_id = ?', [bookId]);
        
        console.log('Existing Entry:', rows);
  
        if (rows.length > 0) {
          // If it exists, update the points by incrementing it by 1
          const updateQuery = 'UPDATE trending_book_points SET points = points + 1 WHERE book_id = ?';
          console.log('Executing:', updateQuery);
          await db.execute(updateQuery, [bookId]);
        } else {
          // If it doesn't exist, insert a new entry with 1 point
          const insertQuery = 'INSERT INTO trending_book_points (book_id, points) VALUES (?, ?)';
          console.log('Executing:', insertQuery);
          await db.execute(insertQuery, [bookId, 1]);
        }
  
        console.log(`Trending point added for book_id: ${bookId}`);
      } catch (error) {
        console.error('Error adding trending point:', error.message);
        throw error;
      }
    }
  };
  
  module.exports = trendingpointsService;
  
  

