const express = require('express');
const router = express.Router();
const textbookRequestController = require('../controllers/textbookRequestController');

router.get('/all-request', textbookRequestController.getAllRequests);
router.post('/add', textbookRequestController.createRequest);
router.get('/:id', textbookRequestController.getRequestById);
router.put('/:id', textbookRequestController.updateRequest);
router.delete('/:id', textbookRequestController.deleteRequest);

router.put("/requests/evaluate/:id", textbookRequestController.evaluateRequest);

router.get('/requests', textbookRequestController.getAllRequestsWithoutEvaluation);

router.get('/requests/:id', textbookRequestController.getRequestByIdWithoutEvaluation);


module.exports = router;
