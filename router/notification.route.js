const express = require("express");
const router = express.Router();
const notificationControl = require("../controller/notification.control");
const { auth } = require("../middleware/auth.middleware");

router.post("/send", auth, notificationControl.sendNotification);
router.get("/user/:userId", auth, notificationControl.getUserNotifications);
router.patch("/:notificationId/read", auth, notificationControl.markNotificationRead);
router.delete("/:notificationId", auth, notificationControl.deleteNotification);

module.exports = router;