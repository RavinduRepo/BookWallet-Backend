const db = require("../config/dbConfig"); // Adjust the path based on your project structure

exports.createGroup = async (group_name, group_description, group_image_url, user_id) => {
  try {
    // Start a transaction (not using prepared statement)
    await db.query('START TRANSACTION');

    // Insert into the groups table
    const groupInsertQuery = `
      INSERT INTO groups (group_name, group_description, group_image_url)
      VALUES (?, ?, ?);
    `;
    const [groupResult] = await db.execute(groupInsertQuery, [group_name, group_description, group_image_url]);

    // Retrieve the inserted group_id
    const group_id = groupResult.insertId;

    // Insert into the groupAdmin table
    const adminInsertQuery = `
      INSERT INTO groupadmin (group_id, user_id)
      VALUES (?, ?);
    `;
    await db.execute(adminInsertQuery, [group_id, user_id]);

    const memberInsertQuery = `
      INSERT INTO member_of (group_id, user_id)
      VALUES (?, ?);
    `;
    await db.execute(memberInsertQuery, [group_id, user_id]);
    // Commit the transaction (not using prepared statement)
    await db.query('COMMIT');
    
    return { group_id, group_name, group_description, group_image_url };
  } catch (error) {
    // Rollback the transaction in case of an error (not using prepared statement)
    await db.query('ROLLBACK');

    // Detailed error logging
    console.error('Error in createGroup:', error);
    throw new Error('Failed to create group');
  }
};
