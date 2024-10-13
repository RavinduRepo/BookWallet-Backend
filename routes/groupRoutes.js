const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: Group management operations
 */

/**
 * @swagger
 * /api/groups/create:
 *   post:
 *     summary: Create a new group
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               group_name:
 *                 type: string
 *               group_description:
 *                 type: string
 *               group_image_url:
 *                 type: string
 *               token:
 *                 type: string
 *             required:
 *               - group_name
 *               - group_description
 *               - group_image_url
 *               - token
 *     responses:
 *       200:
 *         description: Group created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 group:
 *                   type: object
 *       400:
 *         description: All fields are required
 *       500:
 *         description: Internal server error
 */
router.post("/create", groupController.createGroup);

/**
 * @swagger
 * /api/groups/user-groups:
 *   get:
 *     summary: Get all groups by user ID
 *     tags: [Groups]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer YOUR_TOKEN_HERE"
 *     responses:
 *       200:
 *         description: List of groups for the user
 *       500:
 *         description: Internal server error
 */
router.get("/user-groups", groupController.getGroupsByUserId);

/**
 * @swagger
 * /api/groups/membercount/{group_id}:
 *   get:
 *     summary: Get member count of a specific group
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: group_id
 *         required: true
 *         description: ID of the group
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Member count of the group
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 group_id:
 *                   type: string
 *                 memberCount:
 *                   type: integer
 *       400:
 *         description: Group ID is required
 *       500:
 *         description: Internal server error
 */
router.get("/membercount/:group_id", groupController.getMemberCount);

/**
 * @swagger
 * /api/groups/{group_id}:
 *   get:
 *     summary: Get a specific group by its ID
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: group_id
 *         required: true
 *         description: ID of the group
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Group details
 *       400:
 *         description: Group ID is required
 *       500:
 *         description: Internal server error
 */
router.get("/:group_id", groupController.getGroupById);

/**
 * @swagger
 * /api/groups/{group_id}/members:
 *   get:
 *     summary: Fetch members of a specific group
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: group_id
 *         required: true
 *         description: ID of the group
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of members in the group
 *       400:
 *         description: Group ID is required
 *       500:
 *         description: Internal server error
 */
router.get("/:group_id/members", groupController.getMembersByGroupId);

/**
 * @swagger
 * /api/groups/{group_id}/requests:
 *   get:
 *     summary: Fetch user requests for a specific group
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: group_id
 *         required: true
 *         description: ID of the group
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of user requests for the group
 *       400:
 *         description: Group ID is required
 *       500:
 *         description: Internal server error
 */
router.get("/:group_id/requests", groupController.getUserRequestsByGroupId);

/**
 * @swagger
 * /api/groups/{group_id}/check-admin:
 *   get:
 *     summary: Check if the user is an admin of a group
 *     tags: [Groups]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer YOUR_TOKEN_HERE"
 *       - in: path
 *         name: group_id
 *         required: true
 *         description: ID of the group
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Admin status of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isAdmin:
 *                   type: boolean
 *       400:
 *         description: Group ID is required
 *       500:
 *         description: Internal server error
 */
router.get("/:group_id/check-admin", groupController.checkAdminStatus);

/**
 * @swagger
 * /api/groups/accept-user:
 *   post:
 *     summary: Accept a user into a group
 *     tags: [Groups]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer YOUR_TOKEN_HERE"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               group_id:
 *                 type: string
 *               user_id:
 *                 type: string
 *             required:
 *               - group_id
 *               - user_id
 *     responses:
 *       200:
 *         description: User accepted into the group
 *       400:
 *         description: Group ID and User ID are required
 *       500:
 *         description: Internal server error
 */
router.post("/accept-user", groupController.acceptUserRequest);

/**
 * @swagger
 * /api/groups/request/remove:
 *   post:
 *     summary: Remove user request from a group
 *     tags: [Groups]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer YOUR_TOKEN_HERE"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               group_id:
 *                 type: string
 *               user_id:
 *                 type: string
 *             required:
 *               - group_id
 *               - user_id
 *     responses:
 *       200:
 *         description: User request removed
 *       400:
 *         description: Group ID and User ID are required
 *       500:
 *         description: Internal server error
 */
router.post("/request/remove", groupController.removeUserRequest);

/**
 * @swagger
 * /api/groups/cancel-join-request:
 *   post:
 *     summary: Remove a join request
 *     tags: [Groups]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer YOUR_TOKEN_HERE"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               group_id:
 *                 type: string
 *             required:
 *               - group_id
 *     responses:
 *       200:
 *         description: Join request removed
 *       400:
 *         description: Group ID is required
 *       500:
 *         description: Internal server error
 */
router.post("/cancel-join-request", groupController.removeJoinRequest);

/**
 * @swagger
 * /api/groups/send/join-request:
 *   post:
 *     summary: Send a join request to a group
 *     tags: [Groups]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer YOUR_TOKEN_HERE"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               group_id:
 *                 type: string
 *             required:
 *               - group_id
 *     responses:
 *       200:
 *         description: Join request sent
 *       400:
 *         description: Group ID is required
 *       500:
 *         description: Internal server error
 */
router.post("/send/join-request", groupController.sendJoinRequest);

module.exports = router;
