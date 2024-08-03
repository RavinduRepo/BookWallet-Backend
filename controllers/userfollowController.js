const {
  followUser,
  unfollowUser,
  checkIfFollowing,
} = require("../services/userfollowService");

const followUserController = async (req, res) => {
  const { followerId, followedId } = req.body;

  if (!followerId || !followedId) {
    return res
      .status(400)
      .json({ message: "Follower ID and Followed ID are required" });
  }

  try {
    const result = await followUser(followerId, followedId);
    if (result) {
      res.status(200).json({ message: "User followed successfully" });
    } else {
      res.status(400).json({ message: "Failed to follow user" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const unfollowUserController = async (req, res) => {
  const { followerId, followedId } = req.body;

  if (!followerId || !followedId) {
    return res
      .status(400)
      .json({ message: "Follower ID and Followed ID are required" });
  }

  try {
    const result = await unfollowUser(followerId, followedId);
    if (result) {
      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      res.status(400).json({ message: "Failed to unfollow user" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Controller function to check if a user is following another user
const checkIfFollowingController = async (req, res) => {
  try {
    const { followerId, followedId } = req.query;

    if (!followerId || !followedId) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    const isFollowing = await checkIfFollowing(followerId, followedId);

    res.json({ isFollowing });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  followUserController,
  unfollowUserController,
  checkIfFollowingController,
};
