const express = require("express");
const router = express.Router();
const staffcontrol = require("../controller/staff.control");
const { auth, admin } = require("../middleware/auth.middleware");

router.get("/single", auth, admin, staffcontrol.single);
router.get("/all", auth, admin, staffcontrol.all);
router.patch("/update", auth, admin, staffcontrol.update);
router.delete("/delete", auth, admin, staffcontrol.delete);

module.exports = router;