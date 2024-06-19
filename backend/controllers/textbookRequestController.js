const TextbookRequest = require("../models/TextbookRequest");
const Textbook = require("../models/Textbook");

// Create a new textbook request
exports.createTextbookRequest = async (req, res) => {
  const { textbooks, userID } = req.body;
  const year = new Date().getFullYear(); // Set current year

  try {
    const textbooksExist = await Promise.all(
      textbooks.map(async (item) => {
        const textbook = await Textbook.findById(item.textbook);
        return textbook !== null;
      })
    );

    if (textbooksExist.some((exist) => !exist)) {
      return res
        .status(400)
        .json({ message: "One or more textbooks do not exist" });
    }

    const newRequest = new TextbookRequest({
      textbooks,
      userID,
      year, // Add year to the request
      submission: false, // Set submission to false by default
    });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all textbook requests, optionally filtered by year
exports.getAllTextbookRequests = async (req, res) => {
  const year = req.query.year ? parseInt(req.query.year) : null;

  try {
    const query = year ? { year } : {};
    const requests = await TextbookRequest.find(query)
      .populate({
        path: "textbooks.textbook",
        select: "title grade subject language category level",
      })
      .populate({
        path: "userID",
        select: "full_name organization",
        populate: {
          path: "organization", // Populate the organization field
          select: "name", // Select the name of the organization
        },
      });

    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all textbook requests for a specific year
exports.getAllTextbookRequestsByYear = async (req, res) => {
  const year = parseInt(req.params.year);

  try {
    const requests = await TextbookRequest.find({ year })
      .populate({
        path: "textbooks.textbook",
        select: "title grade subject language category level",
      })
      .populate({
        path: "userID",
        select: "full_name organization",
        populate: {
          path: "organization",
          select: "name",
        },
      });

    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a textbook request by ID
exports.getTextbookRequestById = async (req, res) => {
  try {
    const request = await TextbookRequest.findById(req.params.id)
      .populate({
        path: "textbooks.textbook",
        select: "title grade subject language category level",
      })
      .populate({
        path: "userID",
        select: "full_name organization",
        populate: {
          path: "organization", // Populate the organization field
          select: "name", // Select the name of the organization
        },
      })
      .populate({
        path: "evaluation.evaluatedBy", // Populate evaluatedBy field
        select: "full_name organization",
        populate: {
          path: "organization", // Populate the organization field
          select: "name",
        }, // Select full_name of the user who evaluated
      });
    if (!request) {
      return res.status(404).json({ message: "Textbook request not found" });
    }
    res.status(200).json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a textbook request
exports.updateTextbookRequest = async (req, res) => {
  try {
    const request = await TextbookRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Textbook request not found" });
    }

    if (request.submission) {
      return res
        .status(400)
        .json({ message: "Cannot update a submitted request" });
    }

    Object.assign(request, req.body); // Update the request with new data
    await request.save();

    res.status(200).json(request);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a textbook request
exports.deleteTextbookRequest = async (req, res) => {
  try {
    const request = await TextbookRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Textbook request not found" });
    }

    if (request.submission) {
      return res
        .status(400)
        .json({ message: "Cannot delete a submitted request" });
    }

    await TextbookRequest.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Textbook request deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update the evaluation of a textbook request
exports.updateTextbookRequestEvaluation = async (req, res) => {
  try {
    const { status, evaluatedBy, comment, evaluationDate } = req.body;

    const request = await TextbookRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Textbook request not found" });
    }

    // Update the evaluation fields
    request.evaluation.status = status || request.evaluation.status;
    request.evaluation.evaluatedBy =
      evaluatedBy || request.evaluation.evaluatedBy;
    request.evaluation.comment = comment || request.evaluation.comment;
    request.evaluation.evaluationDate =
      evaluationDate || request.evaluation.evaluationDate;

    await request.save();

    res.status(200).json(request);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a single textbook within a textbook request
exports.updateSingleTextbook = async (req, res) => {
  try {
    const { requestId, textbookId } = req.params;
    const { quantity } = req.body;

    const request = await TextbookRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Textbook request not found" });
    }

    if (request.submission) {
      return res
        .status(400)
        .json({ message: "Cannot update a textbook in a submitted request" });
    }

    const textbook = request.textbooks.find(
      (t) => t.textbook.toString() === textbookId
    );
    if (!textbook) {
      return res
        .status(404)
        .json({ message: "Textbook not found in the request" });
    }

    textbook.quantity = quantity;
    await request.save();

    res.status(200).json(request);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a single textbook from a textbook request
exports.deleteSingleTextbook = async (req, res) => {
  try {
    const { requestId, textbookId } = req.params;

    const request = await TextbookRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Textbook request not found" });
    }

    if (request.submission) {
      return res
        .status(400)
        .json({ message: "Cannot delete a textbook from a submitted request" });
    }

    request.textbooks = request.textbooks.filter(
      (t) => t.textbook.toString() !== textbookId
    );

    await request.save();
    res.status(200).json(request);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Submit a textbook request
exports.submitTextbookRequest = async (req, res) => {
  try {
    const request = await TextbookRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Textbook request not found" });
    }

    request.submission = true; // Set submission to true
    await request.save();

    res.status(200).json(request);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.addManyTextbookRequests = async (req, res) => {
  const { textbookRequests } = req.body; // Assuming req.body.textbookRequests is an array of textbook request objects

  try {
    // Use insertMany to insert multiple textbook requests at once
    const insertedRequests = await TextbookRequest.insertMany(textbookRequests);

    res.status(201).json({
      success: true,
      message: "Textbook requests added successfully",
      textbookRequests: insertedRequests,
    });
  } catch (err) {
    console.error("Error adding textbook requests:", err);
    res.status(500).json({
      success: false,
      message: "Failed to add textbook requests",
      error: err.message,
    });
  }
};




