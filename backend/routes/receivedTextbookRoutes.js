const express = require("express");
const router = express.Router();
const receivedTextbookController = require("../controllers/receivedTextbookController");

// Create a new received textbook entry
router.post("/add", receivedTextbookController.createReceivedTextbook);

// Get all received textbooks
router.get("/all", receivedTextbookController.getAllReceivedTextbooks);

// Get a received textbook entry by ID
router.get("/:id", receivedTextbookController.getReceivedTextbookById);

// Update a received textbook entry
router.put("/:id", receivedTextbookController.updateReceivedTextbook);

// Delete a received textbook entry
router.delete("/:id", receivedTextbookController.deleteReceivedTextbook);

module.exports = router;
