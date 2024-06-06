const express = require("express");
const router = express.Router();
const {
  createTextbookRequest,
  getAllTextbookRequests,
  getTextbookRequestById,
  updateTextbookRequest,
  deleteTextbookRequest,
  updateTextbookRequestEvaluation,
  updateSingleTextbook,
  deleteSingleTextbook,
} = require("../controllers/textbookRequestController");

// Create a new textbook request
router.post("/add", createTextbookRequest);

// Get all textbook requests
router.get("/all", getAllTextbookRequests);

// Get a textbook request by ID
router.get("/:id", getTextbookRequestById);


router.put("/:id", updateTextbookRequest);

router.put(
  "/:requestId/textbooks/:textbookId",
  updateSingleTextbook
);


router.delete(
  "/:requestId/textbooks/:textbookId",
  deleteSingleTextbook
);


router.delete("/:id", deleteTextbookRequest);

router.put("/evaluation/:id", updateTextbookRequestEvaluation);

module.exports = router;
