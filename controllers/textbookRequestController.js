const TextbookRequest = require('../models/TextbookRequest');

// Get all textbook requests
exports.getAllRequests = async (req, res) => {
    try {
        const requests = await TextbookRequest.find()
            .populate('textbooks.textbookID')
            .populate('organization')
            .populate('userID');
        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new textbook request
exports.createRequest = async (req, res) => {
    const request = new TextbookRequest({
        textbooks: req.body.textbooks,
        organization: req.body.organization,
        userID: req.body.userID
    });

    try {
        const newRequest = await request.save();
        res.status(201).json(newRequest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get a textbook request by ID
exports.getRequestById = async (req, res) => {
    try {
        const request = await TextbookRequest.findById(req.params.id)
            .populate('textbooks.textbookID')
            .populate('organization')
            .populate('userID');
        if (request == null) {
            return res.status(404).json({ message: 'Cannot find request' });
        }
        res.status(200).json(request);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a textbook request
exports.updateRequest = async (req, res) => {
    try {
        const request = await TextbookRequest.findById(req.params.id);
        if (request == null) {
            return res.status(404).json({ message: 'Cannot find request' });
        }

        if (req.body.textbooks != null) {
            request.textbooks = req.body.textbooks;
        }
        if (req.body.evaluation != null) {
            request.evaluation = req.body.evaluation;
        }
        if (req.body.organization != null) {
            request.organization = req.body.organization;
        }
        if (req.body.userID != null) {
            request.userID = req.body.userID;
        }

        const updatedRequest = await request.save();
        res.status(200).json(updatedRequest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a textbook request
exports.deleteRequest = async (req, res) => {
    try {
        const request = await TextbookRequest.findById(req.params.id);
        if (request == null) {
            return res.status(404).json({ message: 'Cannot find request' });
        }

        await request.remove();
        res.status(200).json({ message: 'Deleted request' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
