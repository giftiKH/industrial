const express = require("express");
const router = express.Router();
const {
  createTextbookRequest,
  getAllTextbookRequests,
  getTextbookRequestById,
  updateTextbookRequest,
  deleteTextbookRequest,
  updateTextbookRequestEvaluation,
} = require("../controllers/textbookRequestController");

// Create a new textbook request
router.post("/add", createTextbookRequest);

// Get all textbook requests
router.get("/all-request", getAllTextbookRequests);

// Get a textbook request by ID
router.get("/:id", getTextbookRequestById);

// Update a textbook request
router.put("/:id", updateTextbookRequest);

// Delete a textbook request
router.delete("/:id", deleteTextbookRequest);

router.put("/evaluation/:id", updateTextbookRequestEvaluation);

module.exports = router;
