const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notification.controller');


router.put("/subscribe-user", NotificationController.subscribeToTopic);

// router.get(
//   "/fetch-user-notifications",
//   NotificationController.fetchUserNotifications
// );
 
router.post(
  "/broadcast",
  NotificationController.sendToUser
);

module.exports = router;