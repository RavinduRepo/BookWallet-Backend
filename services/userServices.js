const db = require("../config/dbConfig");


const getUserDetails = async (userId) => {
    try {
      const sql = "SELECT * FROM user WHERE user_id = ?";
      const [rows] = await db.execute(sql, [userId]);
  
      if (rows.length > 0) {
        return rows[0];
      } else {
        return null;
      }
    } catch (err) {
      throw new Error('Database error');
    }
  };
  
  module.exports = { getUserDetails };