const express = require("express");
const router = express.Router();
const patientcontrol = require("../controller/patient.control");
const { auth, admin } = require("../middleware/auth.middleware");

router.get("/single", auth, admin, patientcontrol.single);
router.get("/all", auth, admin, patientcontrol.all);
router.patch("/update", auth, admin, patientcontrol.update);
router.delete("/delete", auth, admin, patientcontrol.delete);

module.exports = router;