const express = require("express");
const router = express.Router();
const patientcontrol = require("../controller/patient.control");
const { auth } = require("../middleware/auth.middleware");

router.post("/register", auth, patientcontrol.register);
router.post("/login", auth, patientcontrol.login);
router.get("/single", auth, patientcontrol.single);
router.patch("/update", auth, patientcontrol.update);

module.exports = router;