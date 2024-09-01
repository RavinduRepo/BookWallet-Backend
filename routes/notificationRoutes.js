const express = require('express');
const NotificationController = require('../controllers/notificationController');
const router = express.Router();

router.get('/share/:userId', NotificationController.getUserNotifications);
router.get('/like/:userId', NotificationController.getUserLikesNotifications);
router.get('/comment/:userId', NotificationController.getUserCommentsNotifications);
router.get('/all/:userId', NotificationController.getAllUserNotifications);
module.exports = router;
