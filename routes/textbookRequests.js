const express = require('express');
const router = express.Router();
const textbookRequestController = require('../controllers/textbookRequestController');

router.get('/', textbookRequestController.getAllRequests);
router.post('/', textbookRequestController.createRequest);
router.get('/:id', textbookRequestController.getRequestById);
router.put('/:id', textbookRequestController.updateRequest);
router.delete('/:id', textbookRequestController.deleteRequest);

module.exports = router;
