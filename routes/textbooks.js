const express = require("express");
const router = express.Router();
const {
  createTextbook,
  
  getAllTextbooks,
  getTextbookById,
  updateTextbook,
  deleteTextbook,
} = require("../controllers/textbookController");

router.post("/add", createTextbook);
router.get("/all-textbooks", getAllTextbooks);
router.get("/:id", getTextbookById);
router.put("/:id", updateTextbook);
router.delete("/:id", deleteTextbook);
module.exports = router;
