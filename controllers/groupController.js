const GroupService = require("../services/groupServices");
const authService = require("../services/authService");

class GroupController {
  async createGroup(req, res) {
    try {
      const { group_name, group_description, group_image_url, token } =
        req.body;

      // Validate the inputs
      if (!group_name || !group_description || !group_image_url || !token) {
        return res.status(400).json({ message: "All fields are required." });
      }

      // Verify token and get user ID
      const decoded = await authService.verifyToken(token);
      const user_id = decoded.id;

      const group = await GroupService.createGroup(
        group_name,
        group_description,
        group_image_url,
        user_id
      );

      res.status(200).json({ message: "Group created successfully", group });
    } catch (error) {
      console.error("Error creating group:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getGroupsByUserId(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1]; // Extract token from headers
      // Verify token and get user ID
      const decoded = await authService.verifyToken(token);
      const userId = decoded.id;

      const groups = await GroupService.getGroupsByUserId(userId);
      res.status(200).json(groups);
    } catch (error) {
      console.error("Error fetching groups by user ID:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async getMemberCount(req, res) {
    try {
      const { group_id } = req.params;

      // Validate input
      if (!group_id) {
        return res.status(400).json({ message: "Group ID is required." });
      }

      // Fetch the member count from the service
      const memberCount = await GroupService.getMemberCount(group_id);

      res.status(200).json({ group_id, memberCount });
    } catch (error) {
      console.error("Error fetching member count:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async getGroupById(req, res) {
    try {
      const { group_id } = req.params;
      if (!group_id) {
        return res.status(400).json({ message: "Group ID is required." });
      }
      const group = await GroupService.getGroupById(group_id);
      res.status(200).json(group);
    } catch (error) {
      console.error("Error fetching group by ID:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new GroupController();
