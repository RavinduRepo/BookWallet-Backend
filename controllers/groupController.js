// Importing necessary services
const GroupService = require("../services/groupServices");
const authService = require("../services/authService");

// Defining the GroupController class
class GroupController {
  // Method to create a new group
  async createGroup(req, res) {
    try {
      const { group_name, group_description, group_image_url, token } = req.body;

      // Validate the inputs
      if (!group_name || !group_description || !group_image_url || !token) {
        return res.status(400).json({ message: "All fields are required." });
      }

      // Verify token and get user ID
      const decoded = await authService.verifyToken(token);
      const user_id = decoded.id;

      // Create a new group using the GroupService
      const group = await GroupService.createGroup(
        group_name,
        group_description,
        group_image_url,
        user_id
      );

      // Respond with the created group details
      res.status(200).json({ message: "Group created successfully", group });
    } catch (error) {
      console.error("Error creating group:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Method to fetch groups by user ID
  async getGroupsByUserId(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1]; // Extract token from headers
      // Verify token and get user ID
      const decoded = await authService.verifyToken(token);
      const userId = decoded.id;

      // Fetch groups associated with the user ID
      const groups = await GroupService.getGroupsByUserId(userId);
      res.status(200).json(groups);
    } catch (error) {
      console.error("Error fetching groups by user ID:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Method to get the member count for a group
  async getMemberCount(req, res) {
    try {
      const { group_id } = req.params;

      // Validate input
      if (!group_id) {
        return res.status(400).json({ message: "Group ID is required." });
      }

      // Fetch the member count from the service
      const memberCount = await GroupService.getMemberCount(group_id);

      // Respond with the member count
      res.status(200).json({ group_id, memberCount });
    } catch (error) {
      console.error("Error fetching member count:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Method to get group details by group ID
  async getGroupById(req, res) {
    try {
      const { group_id } = req.params;
      // Validate input
      if (!group_id) {
        return res.status(400).json({ message: "Group ID is required." });
      }
      // Fetch the group details from the service
      const group = await GroupService.getGroupById(group_id);
      res.status(200).json(group);
    } catch (error) {
      console.error("Error fetching group by ID:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Method to get members of a group by group ID
  async getMembersByGroupId(req, res) {
    try {
      const { group_id } = req.params;

      // Validate input
      if (!group_id) {
        return res.status(400).json({ message: "Group ID is required." });
      }

      // Fetch members of the specified group
      const members = await GroupService.getMembersByGroupId(group_id);
      res.status(200).json(members);
    } catch (error) {
      console.error("Error fetching group members:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Method to get user requests for a specific group
  async getUserRequestsByGroupId(req, res) {
    try {
      const { group_id } = req.params;

      // Validate input
      if (!group_id) {
        return res.status(400).json({ message: "Group ID is required." });
      }

      // Fetch user requests for the specified group
      const reqmembers = await GroupService.getUserRequestsByGroupId(group_id);
      res.status(200).json(reqmembers);
    } catch (error) {
      console.error("Error fetching user requests by group ID:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Method to check if the user is an admin of a specific group
  async checkAdminStatus(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1]; // Extract token from headers
      const { group_id } = req.params; // Get the group_id from the request parameters
      // Validate input
      if (!group_id) {
        return res.status(400).json({ message: "Group ID is required." });
      }

      // Verify token and get user ID
      const decoded = await authService.verifyToken(token);
      const user_id = decoded.id;

      // Check if the user is an admin of the group
      const isAdmin = await GroupService.isAdmin(user_id, group_id);

      // Respond with admin status
      res.status(200).json({ isAdmin });
    } catch (error) {
      console.error("Error checking admin status:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Method to accept a user request to join a group
  async acceptUserRequest(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1]; // Extract token from headers
      const { group_id, user_id } = req.body; // Extract group_id and user_id from the request body

      // Validate input
      if (!group_id || !user_id) {
        return res
          .status(400)
          .json({ message: "Group ID and User ID are required." });
      }

      // Verify token and get admin (the user making the request)
      const decoded = await authService.verifyToken(token);
      const admin_id = decoded.id;

      // Call service to accept the user request
      const result = await GroupService.acceptUserRequest(
        group_id,
        user_id,
        admin_id
      );

      // Respond with the result of the acceptance
      res.status(200).json(result);
    } catch (error) {
      console.error("Error accepting user request:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Method to remove a user request from a group
  async removeUserRequest(req, res) {
    try {
      const { group_id, user_id } = req.body;
      const token = req.headers.authorization?.split(" ")[1]; // Extract token from headers

      // Validate input
      if (!group_id || !user_id) {
        return res
          .status(400)
          .json({ message: "Group ID and User ID are required." });
      }

      // Verify token and get the admin ID from the token
      const decoded = await authService.verifyToken(token);
      const admin_id = decoded.id;

      // Call the service to remove the user request
      const result = await GroupService.removeUserRequest(
        group_id,
        user_id,
        admin_id
      );

      // Respond with the result of the removal
      res.status(200).json(result);
    } catch (error) {
      console.error("Error removing user request:", error);
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  }

  // Method to send a join request to a group
  async sendJoinRequest(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1]; // Extract token from headers
      const { group_id } = req.body; // Extract group_id from the request body

      // Validate input
      if (!group_id) {
        return res.status(400).json({ message: "Group ID is required." });
      }

      // Verify token and get user ID
      const decoded = await authService.verifyToken(token);
      const user_id = decoded.id;

      // Call service to send the join request
      const result = await GroupService.sendJoinRequest(group_id, user_id);

      // Respond with the result of the join request
      res.status(200).json(result);
    } catch (error) {
      console.error("Error sending join request:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Method to remove a join request from a group
  async removeJoinRequest(req, res) {
    try {
      console.log("hi");

      const token = req.headers.authorization?.split(" ")[1]; // Extract token from headers
      const { group_id } = req.body; // Extract group_id from the request body

      // Validate input
      if (!group_id) {
        return res.status(400).json({ message: "Group ID is required." });
      }

      // Verify token and get user ID
      const decoded = await authService.verifyToken(token);
      const user_id = decoded.id;

      // Call the service to remove the join request
      const result = await GroupService.removeJoinRequest(group_id, user_id);

      // Respond with the result of the removal
      res.status(200).json(result);
    } catch (error) {
      console.error("Error removing join request:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

// Export the GroupController instance
module.exports = new GroupController();
