const NotificationService = require('../services/notificationService');

class NotificationController {
  async getUserNotifications(req, res) {
    const { userId } = req.params;

    try {
      const notifications = await NotificationService.getNotificationsForUser(userId);
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching notifications', error });
    }
  }

  async getUserLikesNotifications(req, res) {
    const { userId } = req.params;

    try {
      const notifications = await NotificationService.getLikesNotificationsForUser(userId);
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching notifications', error });
    }
  }
}

module.exports = new NotificationController();
