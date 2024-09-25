const db = require("../config/dbConfig");
const User = require("../models/userProfileModel");

const seachUsers = async (query) => {
  try {
    const [rows] = await db.execute(
      `SELECT user.user_id, 
              user.username, 
              user.email, 
              user.imageUrl, 
              user.description
       FROM user
       WHERE user.username LIKE ?`, 
       [`%${query}%`]  // This allows for partial matching of the query in the username
    );

    // Mapping the result rows and changing `user_id` to `userId`
    return rows.map((row) => ({
      userId: row.user_id,  // Mapping `user_id` to `userId`
      username: row.username,
      email: row.email,
      description: row.description,
      imageUrl: row.imageUrl
    }));
    
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};

const searchGroups = async (query, user_id) => {
    try {
        const [rows] = await db.execute(
            `SELECT g.group_id, 
                    g.group_name, 
                    g.group_description, 
                    g.group_image_url, 
                    (
                      SELECT COUNT(DISTINCT m2.user_id)
                      FROM member_of m2
                      WHERE m2.group_id = g.group_id
                    ) AS memberCount,
                    CASE 
                      WHEN m.user_id IS NOT NULL THEN 'member' 
                      WHEN EXISTS (
                           SELECT 1 
                           FROM group_member_req r 
                           WHERE r.group_id = g.group_id 
                           AND r.user_id = ?
                      ) THEN 'requested'
                      ELSE 'not_member'
                    END AS membershipStatus
             FROM \`groups\` g
             LEFT JOIN member_of m ON g.group_id = m.group_id AND m.user_id = ?
             WHERE g.group_name LIKE ?;`,
            [user_id, user_id, `%${query}%`]
        );

        // Return the results with mapped fields
        return rows.map((row) => ({
            group_id: row.group_id,
            group_name: row.group_name,
            group_description: row.group_description,
            group_image_url: row.group_image_url,
            memberCount: row.memberCount,
            membershipStatus: row.membershipStatus
        }));
    } catch (error) {
        console.error("Error fetching groups:", error);
        throw new Error("Failed to fetch groups");
    }
};

module.exports = { seachUsers , searchGroups };
