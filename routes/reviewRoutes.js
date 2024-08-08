const express = require("express");
const router = express.Router();
const {
  getReviewWithId,
  getReviews,
  getReviewWithBookId,
  getReviewWithUserId,
} = require("../services/reviewService");
// const { getLikesIdByReviewId } = require("../services/reviewLikesService");
const { ReviewPost } = require("../controllers/reviewPostController");
router.post("/reviewpost", ReviewPost); //Not in use
router.get("/getReviewWithId/:reviewId", getReviewWithId);
router.get("/getReviews", getReviews);
router.get("/getReviewWithBookId/:bookId", getReviewWithBookId);
router.get("/getReviewWithUserId/:userId", getReviewWithUserId);
// router.get("/:reviewId/likes", getLikesIdByReviewId);
const reviewLikesController = require("../controllers/reviewLikesController"); // Ensure this path is correct

// Route to get users who liked a review
router.get("/:reviewId/likes", reviewLikesController.getUsersWhoLikedReview); // Ensure this function exists

// Route to like a review
router.post("/:reviewId/like", reviewLikesController.likeReviewController);

// Route to unlike a review
router.post("/:reviewId/unlike", reviewLikesController.unlikeReviewController);

// Route to get the like count for a review
router.get(
  "/:reviewId/like-count",
  reviewLikesController.getLikeCountController
);

module.exports = router;
