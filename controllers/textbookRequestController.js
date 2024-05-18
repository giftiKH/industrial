const TextbookRequest = require('../models/TextbookRequest');

// Get all textbook requests
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await TextbookRequest.find()
      .populate({
        path: "textbooks.textbookID",
        select: "title grade subject language category level",
      })
      .populate({
        path: "organization",
        select: "name type",
      })
      .populate({
        path: "userID",
        select: "full_name",
      });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Create a new textbook request
// Create a new textbook request
exports.createRequest = async (req, res) => {
    const { textbooks, organization, userID } = req.body;

    const request = new TextbookRequest({
        textbooks,
        organization,
        userID
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
      .populate({
        path: "textbooks.textbookID",
        select: "title grade subject language category level",
      })
      .populate({
        path: "organization",
        select: "name type",
      })
      .populate({
        path: "userID",
        select: "full_name",
      });
    if (request == null) {
      return res.status(404).json({ message: "Cannot find request" });
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
      return res.status(404).json({ message: "Cannot find request" });
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
      return res.status(404).json({ message: "Cannot find request" });
    }

    await request.deleteOne(); // Use deleteOne() instead of remove()
    res.status(200).json({ message: "Deleted request" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
