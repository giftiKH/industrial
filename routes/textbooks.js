const express = require('express');
const router = express.Router();
const textbookController = require('../controllers/textbookController');

router.get('/', textbookController.getAllTextbooks);
router.post('/', textbookController.createTextbook);
router.get('/:id', textbookController.getTextbookById);
router.put('/:id', textbookController.updateTextbook);
router.delete('/:id', textbookController.deleteTextbook);

module.exports = router;
