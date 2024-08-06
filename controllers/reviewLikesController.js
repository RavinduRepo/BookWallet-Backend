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

module.exports = {
  getUsersWhoLikedReview,
};
