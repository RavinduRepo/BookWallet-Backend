const db = require("../config/dbConfig");
const Group = require("../models/GroupModel");

class GroupService {
  async createGroup(group_name, group_description, group_image_url, user_id) {
    const createdAt = new Date();

    try {
      // Insert into the groups table
      const groupInsertQuery = `
        INSERT INTO groups (group_name, group_description, group_image_url, created_at)
        VALUES (?, ?, ?, ?);
      `;
      const [groupResult] = await db.execute(groupInsertQuery, [
        group_name,
        group_description,
        group_image_url,
        createdAt,
      ]);

      const group_id = groupResult.insertId;

      // Insert into the groupAdmin table
      const adminInsertQuery = `
        INSERT INTO groupadmin (group_id, user_id)
        VALUES (?, ?);
      `;
      await db.execute(adminInsertQuery, [group_id, user_id]);

      // Insert into the member_of table
      const memberInsertQuery = `
        INSERT INTO member_of (group_id, user_id)
        VALUES (?, ?);
      `;
      await db.execute(memberInsertQuery, [group_id, user_id]);

      return new Group(
        group_id,
        group_name,
        group_description,
        group_image_url,
        createdAt
      );
    } catch (error) {
      console.error("Error in createGroup:", error);
      throw new Error("Failed to create group");
    }
  }

  async getGroupsByUserId(user_id) {
    try {
        console.log("Fetching groups for user");

        const groupsQuery = `
            SELECT g.group_id, 
                   g.group_name, 
                   g.group_description, 
                   g.group_image_url, 
                   g.created_at, 
                   (
                     SELECT COUNT(DISTINCT m2.user_id)
                     FROM member_of m2
                     WHERE m2.group_id = g.group_id
                   ) AS memberCount
            FROM \`groups\` g
            INNER JOIN member_of m ON g.group_id = m.group_id
            WHERE m.user_id = ?;
        `;

        const [rows] = await db.execute(groupsQuery, [user_id]);

        return rows.map(
            (row) =>
                new Group(
                    row.group_id,
                    row.group_name,
                    row.group_description,
                    row.group_image_url,
                    row.created_at,
                    row.memberCount, // Include member count for the relevant group
                    0, // discussionCount (can be fetched separately if needed)
                    [] // memberIds (can be fetched separately if needed)
                )
        );
    } catch (error) {
        console.error("Error in getGroupsByUserId:", error);
        throw new Error("Failed to fetch groups for the user");
    }
}

  async getGroupById(group_id) {
    try {
      const groupQuery = `
        SELECT g.group_id, 
               g.group_name, 
               g.group_description, 
               g.group_image_url, 
               g.created_at, 
               (
                 SELECT COUNT(DISTINCT m2.user_id)
                 FROM member_of m2
                 WHERE m2.group_id = g.group_id
               ) AS memberCount
        FROM \`groups\` g
        WHERE g.group_id = ?;
      `;

      const [rows] = await db.execute(groupQuery, [group_id]);

      if (rows.length === 0) {
        throw new Error("Group not found");
      }

      const row = rows[0];
      return new Group(
        row.group_id,
        row.group_name,
        row.group_description,
        row.group_image_url,
        row.created_at,
        row.memberCount // Include member count
      );
    } catch (error) {
      console.error("Error fetching group by ID:", error);
      throw new Error("Failed to fetch group by ID");
    }
  }
  async getMembersByGroupId(group_id) {
    try {
      const membersQuery = `
        SELECT u.user_id, u.username, u.email
        FROM user u
        INNER JOIN member_of m ON u.user_id = m.user_id
        WHERE m.group_id = ?;
      `;

      const [rows] = await db.execute(membersQuery, [group_id]);

      if (rows.length === 0) {
        throw new Error("No members found for this group");
      }

      // Map the rows to the expected structure
      return rows.map((row) => ({
        userId: row.user_id, // Adjust according to the column name returned
        username: row.username,
        email: row.email,
        imageUrl: "default_image_url", // Adjust if you have an imageUrl field
      }));
    } catch (error) {
      console.error("Error fetching members by group ID:", error);
      throw new Error("Failed to fetch group members");
    }
  }
  async getUserRequestsByGroupId(group_id) {
    try {
      const query = `
        SELECT u.user_id, u.username, u.email
        FROM group_member_req gmr
        INNER JOIN user u ON gmr.user_id = u.user_id
        WHERE gmr.group_id = ?;
      `;
      const [rows] = await db.execute(query, [group_id]);

      // Map the rows to the expected structure
      return rows.map((row) => ({
        userId: row.user_id,
        username: row.username,
        email: row.email,
        imageUrl: "default_image_url", // You can adjust this if you have a field for the image URL
      }));
    } catch (error) {
      console.error("Error fetching user requests by group ID:", error);
      throw new Error("Failed to fetch user requests");
    }
  }
  // Check if the user is an admin of a specific group
  async isAdmin(user_id, group_id) {
    try {
      const query = `
        SELECT COUNT(*) AS isAdmin
        FROM groupadmin
        WHERE user_id = ? AND group_id = ?;
      `;
      const [rows] = await db.execute(query, [user_id, group_id]);
      console.log(rows[0].isAdmin > 0);
      return rows[0].isAdmin > 0; // Returns true if user is admin
    } catch (error) {
      console.error("Error checking admin status:", error);
      throw new Error("Failed to check admin status");
    }
  }
  async acceptUserRequest(group_id, user_id, admin_id) {
    try {
      console.log("ubudeqidueqh");

      // First, check if the admin_id is indeed the admin of the group
      const isAdmin = await this.isAdmin(admin_id, group_id);
      if (!isAdmin) {
        throw new Error("Only group admins can accept user requests.");
      }
      // Remove the user from the group_member_req table
      const deleteRequestQuery = `
        DELETE FROM group_member_req 
        WHERE group_id = ? AND user_id = ?;
      `;
      await db.execute(deleteRequestQuery, [group_id, user_id]);

      // Add the user to the member_of table
      const insertMemberQuery = `
        INSERT INTO member_of (group_id, user_id) 
        VALUES (?, ?);
      `;
      await db.execute(insertMemberQuery, [group_id, user_id]);

      return { message: "User successfully added to the group." };
    } catch (error) {
      console.error("Error accepting user request:", error);
      throw new Error("Failed to accept user request.");
    }
  }
  // Method to remove a user request from the group_member_req table
  async removeUserRequest(group_id, user_id, admin_id) {
    try {
      // Check if the user is an admin of the group
      const isAdmin = await this.isAdmin(admin_id, group_id);
      if (!isAdmin) {
        throw new Error("You do not have permission to perform this action.");
      }
      // Remove the request from group_member_req table
      const deleteRequestQuery = `
      DELETE FROM group_member_req
      WHERE group_id = ? AND user_id = ?;
    `;
      const [result] = await db.execute(deleteRequestQuery, [
        group_id,
        user_id,
      ]);

      // If no rows were deleted, it means the request doesn't exist
      if (result.affectedRows === 0) {
        throw new Error("No such request exists.");
      }

      return { message: "User request successfully removed." };
    } catch (error) {
      console.error("Error removing user request:", error);
      throw new Error("Failed to remove user request.");
    }
  }
}
module.exports = new GroupService();
