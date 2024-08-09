const reviewLikesService = require("../services/reviewLikesService");

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
  const { userId } = req.body;
  const { reviewId } = req.params;

  if (!userId || !reviewId) {
    return res
      .status(400)
      .json({ error: "User ID and Review ID are required" });
  }

  try {
    await reviewLikesService.likeReview(reviewId, userId);
    res.status(200).json({ message: "Review liked successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to unlike a review
const unlikeReviewController = async (req, res) => {
  const { userId } = req.body;
  const { reviewId } = req.params;

  if (!userId || !reviewId) {
    return res
      .status(400)
      .json({ error: "User ID and Review ID are required" });
  }

  try {
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
