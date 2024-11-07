const express = require("express");
const router = express.Router();
const ReportController = require("../controller/report.control");
const { auth, admin } = require("../middleware/auth.middleware");

router.post("/:reportType/create", auth, admin, ReportController.create);
router.get("/:reportType/:reportId", auth, admin, ReportController.single);
router.get("/:reportType", auth, admin, ReportController.all);
router.patch("/update/:report_id", auth, admin, ReportController.update);
router.delete("/:reportType/:reportId", auth, admin, ReportController.delete);

module.exports = router;