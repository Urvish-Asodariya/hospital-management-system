const express = require("express");
const router = express.Router();
const doctorcontrol = require("../controller/doctor.control");
const { auth, admin } = require("../middleware/auth.middleware");

router.get("/all", auth, admin, doctorcontrol.all);
router.get("/single", auth, admin, doctorcontrol.single);
router.patch("/update", auth, admin, doctorcontrol.update);
router.delete("/delete", auth, admin, doctorcontrol.delete);

module.exports = router;