const reviewLikesService = require("../services/reviewLikesService");
const authService = require("../services/authService");
const trendingpointsService = require("../services/trendingpointsService");

// Controller function to handle the request
const getUsersWhoLikedReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const users = await reviewLikesService.getUsersWhoLikedReview(reviewId);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Controller function to like a review
const likeReviewController = async (req, res) => {
  const { userId, token } = req.body;
  const { reviewId } = req.params;

  try {
    const decoded = await authService.verifyToken(token);
    const loggedInUserId = decoded.id;

    if (!loggedInUserId || !reviewId) {
      return res
        .status(400)
        .json({ error: "User ID and Review ID are required" });
    }

    // Check if the userId in the request body matches the loggedInUserId from the token
    if (userId !== loggedInUserId) {
      return res
        .status(403)
        .json({ error: "User ID does not match the logged-in user" });
    }
    await trendingpointsService.addTrendingPointFromReview(reviewId,5);
    await reviewLikesService.likeReview(reviewId, userId);
    res.status(200).json({ message: "Review liked successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to unlike a review
const unlikeReviewController = async (req, res) => {
  const { userId, token } = req.body;
  const { reviewId } = req.params;

  if (!userId || !reviewId) {
    return res
      .status(400)
      .json({ error: "User ID and Review ID are required" });
  }

  try {
    const decoded = await authService.verifyToken(token);
    const loggedInUserId = decoded.id;

    // Check if the userId in the request body matches the loggedInUserId from the token
    if (userId !== loggedInUserId) {
      return res
        .status(403)
        .json({ error: "User ID does not match the logged-in user" });
    }

    await reviewLikesService.unlikeReview(reviewId, userId);
    res.status(200).json({ message: "Review unliked successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get like count for a review
const getLikeCountController = async (req, res) => {
  const { reviewId } = req.params;

  if (!reviewId) {
    return res.status(400).json({ error: "Review ID is required" });
  }

  try {
    const likeCount = await reviewLikesService.getLikeCount(reviewId);
    res.status(200).json({ likeCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkIfLikedController = async (req, res) => {
  const { userId, reviewId } = req.params;

  if (!userId || !reviewId) {
    return res
      .status(400)
      .json({ error: "User ID and Review ID are required" });
  }

  try {
    const isLiked = await reviewLikesService.checkIfLiked(userId, reviewId);
    res.status(200).json({ isLiked });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsersWhoLikedReview,
  likeReviewController,
  unlikeReviewController,
  getLikeCountController,
  checkIfLikedController,
};
