const express = require("express");
const router = express.Router();
const appointmentcontrol = require("../controller/appointment.control");
const { auth } = require("../middleware/auth.middleware");

router.post("/create", auth, appointmentcontrol.create);
router.get("/my", auth, appointmentcontrol.single);

module.exports = router;