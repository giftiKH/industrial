const express = require('express');
const router = express.Router();
const textbookController = require('../controllers/textbookController');

router.get('/all-textbooks', textbookController.getAllTextbooks);
router.post('/add', textbookController.createTextbook);
router.get('/:id', textbookController.getTextbookById);
router.put('/:id', textbookController.updateTextbook);
router.delete('/:id', textbookController.deleteTextbook);

module.exports = router;
