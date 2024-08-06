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

module.exports = router;
