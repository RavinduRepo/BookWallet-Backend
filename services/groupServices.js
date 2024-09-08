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
        FROM groups g
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
        FROM groups g
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
}

module.exports = new GroupService();
