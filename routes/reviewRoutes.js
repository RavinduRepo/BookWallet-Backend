const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const reviewLikesController = require("../controllers/reviewLikesController");
const reviewcommentsController = require("../controllers/reviewCommentsController");
const shareController = require("../controllers/shareController");

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API endpoints to manage reviews
 */

/**
 * @swagger
 * /api/reviews/getReviewWithId/{reviewId}:
 *   get:
 *     summary: Fetch all details of a review using the review ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The unique ID of the review
 *     responses:
 *       200:
 *         description: Review details successfully fetched
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Missing or invalid review ID
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error while fetching review details
 */
router.get("/getReviewWithId/:reviewId", reviewController.getReviewWithId);

/**
 * @swagger
 * /api/reviews/getReviews:
 *    get:
 *      summery: Fetch all Reviews in database
 *      tags: [Reviews]
 *      responses:
 *        200:
 *           description: Reviews details fetched
 *           content:
 *             applicatio/json:
 *                schema:
 *                  $ref: '#/components/schemas/Review'
 *        400:
 *           description: Missing
 *        404:
 *           description: Review not found
 *        500:
 *           description: Server error while fetching review details
 *
 */

//Review actions
router.get("/getReviews", reviewController.getReviews);

/**
 * @swagger
 * /api/reviews/getReviewWithBookId/{bookId}:
 *    get:
 *      summary: Fetch all reviews for a specific book based on the provided book ID
 *      tags: [Reviews]
 *      parameters:
 *        - in: path
 *          name: bookId
 *          schema:
 *            type: string
 *          required: true
 *          description: The ID of the book to fetch reviews for
 *      responses:
 *        200:
 *          description: Reviews for the specified book fetched successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Review'
 *        400:
 *          description: Missing or invalid book ID
 *        404:
 *          description: No reviews found for the specified book ID
 *        500:
 *          description: Server error while fetching review details
 */
router.get(
  "/getReviewWithBookId/:bookId",
  reviewController.getReviewWithBookId
);

/**
 * @swagger
 * /api/reviews/getReviewWithUserId/{userId}:
 *    get:
 *      summary: Fetch all reviews written by a specific user based on the provided user ID
 *      tags: [Reviews]
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *            type: string
 *          required: true
 *          description: The ID of the user to fetch reviews for
 *      responses:
 *        200:
 *          description: Reviews for the specified user fetched successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Review'
 *        400:
 *          description: Missing or invalid user ID
 *        404:
 *          description: No reviews found for the specified user ID
 *        500:
 *          description: Server error while fetching review details
 */

router.get(
  "/getReviewWithUserId/:userId",
  reviewController.getReviewWithUserId
);

/**
 * @swagger
 * /api/reviews/deleteReview/{reviewId}/{userId}:
 *    delete:
 *      summary: Delete a specific review written by a user
 *      tags: [Reviews]
 *      parameters:
 *        - in: path
 *          name: reviewId
 *          schema:
 *            type: string
 *          required: true
 *          description: The ID of the review to delete
 *        - in: path
 *          name: userId
 *          schema:
 *            type: string
 *          required: true
 *          description: The ID of the user who wrote the review
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *                  description: Authentication token of the user performing the delete action
 *      responses:
 *        200:
 *          description: Review deleted successfully
 *        400:
 *          description: Missing or invalid review ID, user ID, or token
 *        403:
 *          description: Unauthorized action
 *        404:
 *          description: Review not found
 *        500:
 *          description: Server error while deleting review
 */

router.delete("/deleteReview/:reviewId/:userId", reviewController.deleteReview);

/**
 * @swagger
 * /api/reviews/updateReview/{reviewId}/{userId}:
 *    put:
 *      summary: Update a specific review written by a user
 *      tags: [Reviews]
 *      parameters:
 *        - in: path
 *          name: reviewId
 *          schema:
 *            type: string
 *          required: true
 *          description: The ID of the review to be updated
 *        - in: path
 *          name: userId
 *          schema:
 *            type: string
 *          required: true
 *          description: The ID of the user who wrote the review
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                content:
 *                  type: string
 *                  description: The updated content of the review
 *                rating:
 *                  type: number
 *                  description: The updated rating for the review (1-5)
 *                token:
 *                  type: string
 *                  description: Authentication token of the user performing the update action
 *      responses:
 *        200:
 *          description: Review updated successfully
 *        400:
 *          description: Missing or invalid review ID, user ID, content, rating, or token
 *        403:
 *          description: Unauthorized action
 *        404:
 *          description: Review not found
 *        500:
 *          description: Server error while updating review
 */

router.put("/updateReview/:reviewId/:userId", reviewController.updateReview);

//Review Comment actions
/**
 * @swagger
 * /api/reviews/comments/add:
 *    post:
 *      summary: Add a comment to a specific review
 *      tags: [Comments]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                comment:
 *                  type: object
 *                  description: The comment details
 *                  properties:
 *                    user_id:
 *                      type: string
 *                      description: The ID of the user adding the comment
 *                    context:
 *                      type: string
 *                      description: The text content of the comment
 *                reviewId:
 *                  type: string
 *                  description: The ID of the review to add the comment to
 *                token:
 *                  type: string
 *                  description: Authentication token of the user adding the comment
 *      responses:
 *        201:
 *          description: Comment added successfully
 *        400:
 *          description: Missing or invalid comment or review ID
 *        403:
 *          description: Unauthorized action (user ID mismatch)
 *        500:
 *          description: Internal server error while adding the comment
 */

// Route to add a comment
router.post("/comments/add", reviewcommentsController.addCommentController);
// Define the route to get comments by review ID

/**
 * @swagger
 * /api/reviews/{reviewId}/comments:
 *    get:
 *      summary: Fetch all comments for a specific review
 *      tags: [Comments]
 *      parameters:
 *        - in: path
 *          name: reviewId
 *          schema:
 *            type: string
 *          required: true
 *          description: The ID of the review to fetch comments for
 *      responses:
 *        200:
 *          description: Comments for the specified review fetched successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    comment_id:
 *                      type: string
 *                      description: The ID of the comment
 *                    review_id:
 *                      type: string
 *                      description: The ID of the review the comment belongs to
 *                    user_id:
 *                      type: string
 *                      description: The ID of the user who wrote the comment
 *                    context:
 *                      type: string
 *                      description: The text content of the comment
 *                    date:
 *                      type: string
 *                      format: date-time
 *                      description: The date and time when the comment was added
 *        400:
 *          description: Missing or invalid review ID
 *        404:
 *          description: No comments found for the specified review ID
 *        500:
 *          description: Server error while fetching comments
 */

router.get(
  "/:reviewId/comments",
  reviewcommentsController.getCommentsByReviewIdController
);
/**
 * @swagger
 * /api/reviews/comments/update/{commentId}/{userId}:
 *    put:
 *      summary: Update a specific comment by a user
 *      tags: [Comments]
 *      parameters:
 *        - in: path
 *          name: commentId
 *          schema:
 *            type: string
 *          required: true
 *          description: The ID of the comment to be updated
 *        - in: path
 *          name: userId
 *          schema:
 *            type: string
 *          required: true
 *          description: The ID of the user who created the comment
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                context:
 *                  type: string
 *                  description: The updated content of the comment
 *                token:
 *                  type: string
 *                  description: Authentication token of the user performing the update action
 *      responses:
 *        200:
 *          description: Comment updated successfully
 *        400:
 *          description: Missing or invalid comment ID, user ID, or context
 *        403:
 *          description: Unauthorized action (user ID mismatch)
 *        404:
 *          description: Comment not found
 *        500:
 *          description: Server error while updating the comment
 */

// Route to update a comment
router.put(
  "/comments/update/:commentId/:userId",
  reviewcommentsController.updateCommentController
);

/**
 * @swagger
 * /api/reviews/comments/delete/{commentId}/{userId}:
 *    delete:
 *      summary: Delete a specific comment by a user
 *      tags: [Comments]
 *      parameters:
 *        - in: path
 *          name: commentId
 *          schema:
 *            type: string
 *          required: true
 *          description: The ID of the comment to be deleted
 *        - in: path
 *          name: userId
 *          schema:
 *            type: string
 *          required: true
 *          description: The ID of the user who created the comment
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *                  description: Authentication token of the user performing the delete action
 *      responses:
 *        200:
 *          description: Comment deleted successfully
 *        400:
 *          description: Missing or invalid comment ID, user ID, or token
 *        403:
 *          description: Unauthorized action (user ID mismatch)
 *        404:
 *          description: Comment not found
 *        500:
 *          description: Server error while deleting the comment
 */

// Route to delete a comment
router.delete(
  "/comments/delete/:commentId/:userId",
  reviewcommentsController.deleteCommentController
);

//Review Likes actions
/**
 * @swagger
 * /api/reviews/{reviewId}/likes:
 *    get:
 *      summary: Fetch all users who liked a specific review
 *      tags: [Likes]
 *      parameters:
 *        - in: path
 *          name: reviewId
 *          schema:
 *            type: string
 *          required: true
 *          description: The ID of the review to fetch likes for
 *      responses:
 *        200:
 *          description: Users who liked the specified review fetched successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    user_id:
 *                      type: string
 *                      description: The ID of the user who liked the review
 *                    username:
 *                      type: string
 *                      description: The username of the user who liked the review
 *        400:
 *          description: Invalid review ID
 *        404:
 *          description: No users found who liked the review
 *        500:
 *          description: Server error while fetching likes
 */

// Route to get users who liked a review
router.get("/:reviewId/likes", reviewLikesController.getUsersWhoLikedReview);
/**
 * @swagger
 * /api/reviews/{reviewId}/like:
 *    post:
 *      summary: Like a specific review by a user
 *      tags: [Likes]
 *      parameters:
 *        - in: path
 *          name: reviewId
 *          schema:
 *            type: string
 *          required: true
 *          description: The ID of the review to like
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                userId:
 *                  type: string
 *                  description: The ID of the user liking the review
 *                token:
 *                  type: string
 *                  description: Authentication token of the user
 *      responses:
 *        200:
 *          description: Review liked successfully
 *        400:
 *          description: User ID and Review ID are required
 *        403:
 *          description: User ID does not match the logged-in user
 *        500:
 *          description: Server error while liking the review
 */

// Route to like a review
router.post("/:reviewId/like", reviewLikesController.likeReviewController);
/**
 * @swagger
 * /api/reviews/{reviewId}/unlike:
 *    post:
 *      summary: Unlike a specific review by a user
 *      tags: [Likes]
 *      parameters:
 *        - in: path
 *          name: reviewId
 *          schema:
 *            type: string
 *          required: true
 *          description: The ID of the review to unlike
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                userId:
 *                  type: string
 *                  description: The ID of the user unliking the review
 *                token:
 *                  type: string
 *                  description: Authentication token of the user
 *      responses:
 *        200:
 *          description: Review unliked successfully
 *        400:
 *          description: User ID and Review ID are required
 *        403:
 *          description: User ID does not match the logged-in user
 *        500:
 *          description: Server error while unliking the review
 */

// Route to unlike a review
router.post("/:reviewId/unlike", reviewLikesController.unlikeReviewController);
/**
 * @swagger
 * /api/reviews/{reviewId}/likes/{userId}:
 *    get:
 *      summary: Check if a user has liked a specific review
 *      tags: [Likes]
 *      parameters:
 *        - in: path
 *          name: reviewId
 *          schema:
 *            type: string
 *          required: true
 *          description: The ID of the review to check
 *        - in: path
 *          name: userId
 *          schema:
 *            type: string
 *          required: true
 *          description: The ID of the user to check
 *      responses:
 *        200:
 *          description: Successfully checked if the review is liked
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  isLiked:
 *                    type: boolean
 *                    description: Indicates if the review is liked by the user
 *        400:
 *          description: User ID and Review ID are required
 *        500:
 *          description: Server error while checking like status
 */

// Route to check liked
router.get(
  "/:reviewId/likes/:userId",
  reviewLikesController.checkIfLikedController
);

/**
 * @swagger
 * /api/reviews/{reviewId}/like-count:
 *    get:
 *      summary: Retrieve the like count for a specific review
 *      tags: [Likes]
 *      parameters:
 *        - in: path
 *          name: reviewId
 *          schema:
 *            type: string
 *          required: true
 *          description: The ID of the review for which to get the like count
 *      responses:
 *        200:
 *          description: Successfully retrieved like count
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  likeCount:
 *                    type: integer
 *                    description: The total number of likes for the review
 *        400:
 *          description: Review ID is required
 *        500:
 *          description: Server error while retrieving like count
 */

// Route to get the like count for a review
router.get(
  "/:reviewId/like-count",
  reviewLikesController.getLikeCountController
);

//Review Share actions
/**
 * @swagger
 * /api/reviews/share:
 *    post:
 *      summary: Share or unshare a review
 *      tags: [Shares]
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          required: true
 *          description: Bearer token for authorization
 *          schema:
 *            type: string
 *            example: Bearer YOUR_TOKEN_HERE
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                review_id:
 *                  type: string
 *                  description: The ID of the review to share or unshare
 *                user_id:
 *                  type: string
 *                  description: The ID of the user sharing the review
 *      responses:
 *        200:
 *          description: Successfully shared or removed the share of the review
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Message indicating the result of the share action
 *        401:
 *          description: Authorization token is required
 *        403:
 *          description: Unauthorized action (user ID does not match)
 *        500:
 *          description: Failed to share or remove review due to server error
 */

// Route to handle sharing a review
router.post("/share", shareController.shareReview);
/**
 * @swagger
 * /api/reviews/shared-reviews/{user_id}:
 *    get:
 *      summary: Get shared reviews by user
 *      tags: [Shares]
 *      parameters:
 *        - name: user_id
 *          in: path
 *          required: true
 *          schema:
 *            type: string
 *          description: The ID of the user whose shared reviews are to be fetched
 *      responses:
 *        200:
 *          description: Successfully retrieved shared reviews
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    review_id:
 *                      type: string
 *                      description: The ID of the shared review
 *                    user_id:
 *                      type: string
 *                      description: The ID of the user who shared the review
 *                    # Include additional properties of the activity as necessary
 *        401:
 *          description: Authorization token is required
 *        403:
 *          description: Unauthorized action (user ID does not match)
 *        500:
 *          description: Failed to fetch shared reviews due to server error
 */

router.get("/shared-reviews/:user_id", shareController.getSharedReviewsByUser);
/**
 * @swagger
 * /api/reviews/{reviewId}/shared-users:
 *    get:
 *      summary: Get users who shared a specific review
 *      tags: [Shares]
 *      parameters:
 *        - name: reviewId
 *          in: path
 *          required: true
 *          schema:
 *            type: string
 *          description: The ID of the review for which shared users are being fetched
 *      responses:
 *        200:
 *          description: Successfully retrieved users who shared the review
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    user_id:
 *                      type: string
 *                      description: The ID of the user who shared the review
 *                    # Include additional properties of the activity as necessary
 *        404:
 *          description: No users found who shared the review
 *        500:
 *          description: Failed to fetch users due to server error
 */

router.get("/:reviewId/shared-users", shareController.getUsersWhoSharedReview);
/**
 * @swagger
 * /api/check-shared:
 *    post:
 *      summary: Check if a review has been shared by a user
 *      tags: [Shares]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                review_id:
 *                  type: string
 *                  description: The ID of the review to check
 *                user_id:
 *                  type: string
 *                  description: The ID of the user to check against
 *      responses:
 *        200:
 *          description: Successfully checked if the review is shared
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  shared:
 *                    type: boolean
 *                    description: Indicates whether the review has been shared by the user
 *        500:
 *          description: Failed to check if review is shared due to server error
 */

router.post("/check-shared", shareController.checkIfShared);
/**
 * @swagger
 * /api/shared-reviews-timeOrder/{userId}:
 *    get:
 *      summary: Retrieve reviews shared by a user in chronological order
 *      tags: [Shares]
 *      parameters:
 *        - in: path
 *          name: userId
 *          required: true
 *          description: The ID of the user whose shared reviews are to be retrieved
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Successfully retrieved shared reviews in chronological order
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    reviewId:
 *                      type: string
 *                      description: The ID of the shared review
 *                    userId:
 *                      type: string
 *                      description: The ID of the user who shared the review
 *                    sharedAt:
 *                      type: string
 *                      format: date-time
 *                      description: The timestamp when the review was shared
 *                    # Include additional properties of the activity as necessary
 *        500:
 *          description: Failed to retrieve shared reviews due to server error
 */

router.get(
  "/shared-reviews-timeOrder/:userId",
  shareController.getReviewsSharedByUserOrderofTime
);
/**
 * @swagger
 * /api/activities/{userId}:
 *    get:
 *      summary: Retrieve activities of a user in chronological order
 *      tags: [Activities]
 *      parameters:
 *        - in: path
 *          name: userId
 *          required: true
 *          description: The ID of the user whose activities are to be retrieved
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Successfully retrieved user activities in chronological order
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    activityId:
 *                      type: string
 *                      description: The ID of the activity
 *                    userId:
 *                      type: string
 *                      description: The ID of the user who performed the activity
 *                    activityType:
 *                      type: string
 *                      description: The type of activity (e.g., "liked", "shared", "commented")
 *                    timestamp:
 *                      type: string
 *                      format: date-time
 *                      description: The timestamp when the activity occurred
 *                    # Include additional properties of the activity as necessary
 *        500:
 *          description: Failed to retrieve user activities due to server error
 */

router.get("/activities/:userId", shareController.getUserActivitiesByTimeOrder);
module.exports = router;
