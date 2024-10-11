const { followUser, unfollowUser, checkIfFollowing } = require("../services/userfollowService");
const authService = require("../services/authService");

// Controller for following a user
const followUserController = async (req, res) => {
  const { followerId, followedId, token } = req.body;

  // Check if both followerId and followedId are provided in the request
  if (!followerId || !followedId) {
    return res.status(400).json({ message: "Follower ID and Followed ID are required" });
  }

  try {
    // Verify the token to authenticate the logged-in user
    const decoded = await authService.verifyToken(token);
    const loggedInUserId = decoded.id;

    // Ensure that the followerId matches the logged-in user from the token
    if (followerId !== loggedInUserId) {
      return res.status(403).json({ error: "Follower ID does not match the logged-in user" });
    }

    // Call the service to follow the user
    const result = await followUser(followerId, followedId);
    
    // Check if the follow action was successful
    if (result) {
      res.status(200).json({ message: "User followed successfully" });
    } else {
      res.status(400).json({ message: "Failed to follow user" });
    }
  } catch (error) {
    // Handle any errors that occur during the follow action
    res.status(500).json({ message: error.message });
  }
};

// Controller for unfollowing a user
const unfollowUserController = async (req, res) => {
  const { followerId, followedId, token } = req.body;

  // Check if both followerId and followedId are provided in the request
  if (!followerId || !followedId) {
    return res.status(400).json({ message: "Follower ID and Followed ID are required" });
  }

  try {
    // Verify the token to authenticate the logged-in user
    const decoded = await authService.verifyToken(token);
    const loggedInUserId = decoded.id;

    // Ensure that the followerId matches the logged-in user from the token
    if (followerId !== loggedInUserId) {
      return res.status(403).json({ error: "Follower ID does not match the logged-in user" });
    }

    // Call the service to unfollow the user
    const result = await unfollowUser(followerId, followedId);

    // Check if the unfollow action was successful
    if (result) {
      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      res.status(400).json({ message: "Failed to unfollow user" });
    }
  } catch (error) {
    // Handle any errors that occur during the unfollow action
    res.status(500).json({ message: error.message });
  }
};

// Controller to check if a user is following another user
const checkIfFollowingController = async (req, res) => {
  try {
    const { followerId, followedId } = req.query;

    // Check if both followerId and followedId are provided in the request query
    if (!followerId || !followedId) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    // Call the service to check if the follower is following the followed user
    const isFollowing = await checkIfFollowing(followerId, followedId);

    // Return the result (true/false) based on the follow status
    res.json({ isFollowing });
  } catch (error) {
    // Handle any errors that occur while checking the follow status
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Export the controller functions
module.exports = { followUserController, unfollowUserController, checkIfFollowingController };
