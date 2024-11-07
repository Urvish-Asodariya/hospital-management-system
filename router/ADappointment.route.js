const express = require("express");
const router = express.Router();
const appointmentcontrol = require("../controller/appointment.control");
const { auth, admin } = require("../middleware/auth.middleware");

router.get("/all", auth, admin, appointmentcontrol.all);
router.delete("/delete", auth, admin, appointmentcontrol.delete);

module.exports = router;