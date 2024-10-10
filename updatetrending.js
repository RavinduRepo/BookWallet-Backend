const cron = require('node-cron');
const pool = require("./config/dbConfig");

// Function to execute the routine
async function updateTrendingBooks() {
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Call the stored procedure to update trending books
    const sql = 'CALL UpdateTrendingBooks()'; // Assuming the stored procedure is named 'UpdateTrendingBooks'
    await connection.query(sql);

    // Release the connection back to the pool
    connection.release();

    console.log('Trending books updated successfully.');
  } catch (error) {
    console.error('Error updating trending books:', error);
  }
}

async function updateTimeIndexAndCleanUp() {
  try {
    const connection = await pool.getConnection();
    const sql = 'CALL UpdateTimeIndexAndCleanUp()';
    await connection.query(sql);
    connection.release();
    console.log('Time index updated and old rows cleaned up.');
  } catch (error) {
    console.error('Error updating time index:', error);
  }
}

// Function to execute the routine
async function updateTotalBookRating() {
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Call the stored procedure to update total book ratings
    const sql = 'CALL UpdateTotalBookRating()'; // Stored procedure that updates total book ratings
    await connection.query(sql);

    // Release the connection back to the pool
    connection.release();

    console.log('Total book ratings updated successfully.');
  } catch (error) {
    console.error('Error updating total book ratings:', error);
  }
}

// Schedule the task to run every minute (for testing)
cron.schedule('* * * * *', () => {
  console.log('Running the trending books update task...');
  updateTrendingBooks();
});

cron.schedule('0 0 * * *', () => {
  console.log('Running the time index update task...');
  updateTimeIndexAndCleanUp();
});

// Schedule the task to run every minute for testing
cron.schedule('* * * * *', () => {
  console.log('Running the total book ratings update task...');
  updateTotalBookRating();
});

// add this to run s per day
// cron.schedule('0 0 * * *', () => {
//   console.log('Running the trending books update task...');
//   updateTrendingBooks();
// });

// // Schedule the task to run daily at midnight (00:00) or as needed
// cron.schedule('0 0 * * *', () => {
//   console.log('Running the total book ratings update task...');
//   updateTotalBookRating();
// });
