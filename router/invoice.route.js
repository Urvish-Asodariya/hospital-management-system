const express = require("express");
const router = express.Router();
const invoicecontrol=require("../controller/invoice.control");
const { auth, admin } = require("../middleware/auth.middleware");

router.post("/create", auth, admin, invoicecontrol.createInvoice);
router.get("/all", auth, invoicecontrol.getAllInvoices);
router.get("/:invoiceId", auth, invoicecontrol.getInvoiceById);
router.patch("/:invoiceId", auth, admin, invoicecontrol.updateInvoices);
router.delete("/:invoiceId", auth, admin, invoicecontrol.deleteInvoice);

module.exports = router;