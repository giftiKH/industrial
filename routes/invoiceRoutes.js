const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoiceController");

router.get("/all", invoiceController.getAllInvoices);
router.get("/:id", invoiceController.getInvoiceById);

module.exports = router;
