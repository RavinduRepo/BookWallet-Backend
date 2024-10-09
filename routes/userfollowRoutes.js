const express = require("express");
const router = express.Router();
const {
  followUserController,
  unfollowUserController,
  checkIfFollowingController,
} = require("../controllers/userfollowController");

/**
 * @swagger
 * tags:
 *  name: User Follow
 *  description: The user follow managing API
 */

/**
 * @swagger
 * /api/user/follow:
 *  post:
 *      summary: Follow a user
 *      tags: [User Follow]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          followerId:
 *                              type: integer
 *                              description: The ID of the user who follows
 *                          followedId:
 *                              type: integer
 *                              description: The ID of the user being followed
 *                          token:
 *                              type: string
 *                              description: Authorization token
 *                      required:
 *                          - followerId
 *                          - followedId
 *                          - token
 *      responses:
 *          200:
 *              description: User followed successfully
 *          403:
 *              description: Follower ID does not match the logged-in user
 *          400:
 *              description: Failed to follow user
 *          500:
 *              description: Server error
 */

// Follow a user
router.post("/follow", followUserController);

/** 
 * /api/user/unfollow:
 *  post:
 *      summary: Unfollow a user
 *      tags: [User Follow]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          followerId:
 *                              type: integer
 *                              description: The ID of the user who follows
 *                          followedId:
 *                              type: integer
 *                              description: The ID of the user being unfollowed
 *                          token:
 *                              type: string
 *                              description: Authorization token
 *                      required:
 *                          - followerId
 *                          - followedId
 *                          - token
 *      responses:
 *          200:
 *              description: User unfollowed successfully
 *          403:
 *              description: Follower ID does not match the logged-in user
 *          400:
 *              description: Failed to unfollow user
 *          500:
 *              description: Server error
*/

// Unfollow a user
router.post("/unfollow", unfollowUserController);

/**
 * 
 * /api/user/check-follow:
 *  get:
 *      summary: Check if a user is following another user
 *      tags: [User Follow]
 *      parameters:
 *          - in: query
 *            name: followerId
 *            schema:
 *              type: integer
 *            required: true
 *            description: The ID of the follower
 *          - in: query
 *            name: followedId
 *            schema:
 *              type: integer
 *            required: true
 *            description: The ID of the user being followed
 *      responses:
 *          200:
 *              description: Success - whether or not the user is following
 *          404:
 *              description: Follow relationship not found
 *          500:
 *              description: Server error
 */

// Route to check if a user is following another user
router.get("/check-follow", checkIfFollowingController);

module.exports = router;
