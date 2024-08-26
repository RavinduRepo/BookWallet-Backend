const pool = require('../config/dbConfig'); // Adjust the path if necessary
const GroupService = require('../services/groupServices');

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
  
    exports.createGroup= async (req, res) => {
      try {
        const { group_name, group_description, group_image_url, user_id } = req.body;
  
        // Validate the inputs
        if (!group_name || !group_description || !group_image_url || !user_id) {
          return res.status(400).json({ message: 'All fields are required.' });
        }
  
        // Call the service to create the group and assign the user as admin
        const group = await GroupService.createGroup(group_name, group_description, group_image_url, user_id);
  
        res.status(200).json({ message: 'Group created successfully', group });
      } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  
  


  
  