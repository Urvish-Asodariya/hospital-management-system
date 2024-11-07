const express = require("express");
const router = express.Router();
const medicinecontrol=require("../controller/medicine.control");
const { auth, admin } = require("../middleware/auth.middleware");

router.post("/add", auth, admin, medicinecontrol.addMedicine);
router.get("/all", auth, medicinecontrol.getAllMedicines);
router.get("/:medicineId", auth, medicinecontrol.getMedicineById);
router.patch("/:medicineId", auth, admin, medicinecontrol.updateMedicine);
router.delete("/:medicineId", auth, admin, medicinecontrol.deleteMedicine);

module.exports = router;