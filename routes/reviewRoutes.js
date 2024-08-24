const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

// const { getLikesIdByReviewId } = require("../services/reviewLikesService");
// const { ReviewPost } = require("../controllers/reviewPostController");
// router.post("/reviewpost", ReviewPost); //Not in use
router.get("/getReviewWithId/:reviewId", reviewController.getReviewWithId);
router.get("/getReviews", reviewController.getReviews);
router.get("/getReviewWithBookId/:bookId", reviewController.getReviewWithBookId);
router.get("/getReviewWithUserId/:userId", reviewController.getReviewWithUserId);
router.delete("/deleteReview/:reviewId/:userId", reviewController.deleteReview);
router.put("/updateReview/:reviewId/:userId", reviewController.updateReview);
// router.get("/:reviewId/likes", getLikesIdByReviewId);
const reviewLikesController = require("../controllers/reviewLikesController");

const reviewcommentsController = require("../controllers/reviewCommentsController");
// Route to add a comment
router.post("/comments/add", reviewcommentsController.addCommentController);
// Define the route to get comments by review ID
router.get(
  "/:reviewId/comments",
  reviewcommentsController.getCommentsByReviewIdController
);
// Route to update a comment
router.put(
  "/comments/update/:commentId/:userId",
  reviewcommentsController.updateCommentController
);

// Route to delete a comment
router.delete(
  "/comments/delete/:commentId/:userId",
  reviewcommentsController.deleteCommentController
);

// Route to get users who liked a review
router.get("/:reviewId/likes", reviewLikesController.getUsersWhoLikedReview); // Ensure this function exists

// Route to like a review
router.post("/:reviewId/like", reviewLikesController.likeReviewController);

// Route to unlike a review
router.post("/:reviewId/unlike", reviewLikesController.unlikeReviewController);

// Route to check liked
router.get(
  "/:reviewId/likes/:userId",
  reviewLikesController.checkIfLikedController
);
// Route to get the like count for a review
router.get(
  "/:reviewId/like-count",
  reviewLikesController.getLikeCountController
);
const shareController = require('../controllers/shareController');

// Route to handle sharing a review
router.post('/share', shareController.shareReview);
router.get('/shared-reviews/:user_id', shareController.getSharedReviewsByUser);
router.get('/:reviewId/shared-users', shareController.getUsersWhoSharedReview);
router.post('/check-shared', shareController.checkIfShared);

module.exports = router;
