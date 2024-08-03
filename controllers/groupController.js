const pool = require('../config/dbConfig'); // Adjust the path if necessary

exports.getAllGroups = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT name FROM groups'); // Adjust table name if necessary
    
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Database error', error: err });
  }
};

exports.getGroupMembers = async (req, res) => {
    const groupId = parseInt(req.params.id);
  
    try {
      const [rows] = await pool.execute(
        `SELECT user.user_id, user.username 
         FROM member_of 
         INNER JOIN user ON member_of.user_id = user.user_id 
         WHERE member_of.group_id = ?`, 
        [groupId]
      );
  
      if (rows.length > 0) {
        res.json(rows);
      } else {
        res.status(404).json({ message: 'No members found for this group' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Database error', error: err });
    }
  };

  
  