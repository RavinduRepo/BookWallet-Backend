const express = require('express');
const NotificationController = require('../controllers/notificationController');
const router = express.Router();

router.get('/share/:userId', NotificationController.getUserNotifications);
router.get('/like/:userId', NotificationController.getUserLikesNotifications);
router.get('/comment/:userId', NotificationController.getUserCommentsNotifications);
router.get('/all/:userId', NotificationController.getAllUserNotifications);
module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API to manage user notifications
 */

/**
 * @swagger
 * /api/notifications/share/{userId}:
 *   get:
 *     summary: Retrieve notifications for a user
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of notifications for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: The notification message
 *       500:
 *         description: Error fetching notifications
 */

/**
 * @swagger
 * /api/notifications/like/{userId}:
 *   get:
 *     summary: Retrieve likes notifications for a user
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of likes notifications for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: The notification message
 *       500:
 *         description: Error fetching likes notifications
 */

/**
 * @swagger
 * /api/notifications/comment/{userId}:
 *   get:
 *     summary: Retrieve comments notifications for a user
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of comments notifications for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: The notification message
 *       500:
 *         description: Error fetching comments notifications
 */

/**
 * @swagger
 * /api/notifications/all/{userId}:
 *   get:
 *     summary: Retrieve all notifications for a user
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of all notifications for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: The notification message
 *       500:
 *         description: Error fetching all notifications
 */
