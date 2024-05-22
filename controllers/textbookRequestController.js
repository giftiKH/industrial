const TextbookRequest = require("../models/TextbookRequest");
const Textbook = require("../models/Textbook");

// Create a new textbook request
exports.createTextbookRequest = async (req, res) => {
  const { textbooks, userID } = req.body;

  try {
    // Check if all textbooks exist
    const textbooksExist = await Promise.all(
      textbooks.map(async (item) => {
        const textbook = await Textbook.findById(item.textbook);
        return textbook !== null;
      })
    );

    // If any textbook does not exist, return error
    if (textbooksExist.some((exist) => !exist)) {
      return res
        .status(400)
        .json({ message: "One or more textbooks do not exist" });
    }

    const newRequest = new TextbookRequest({
      textbooks,
      userID,
    });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all textbook requests
exports.getAllTextbookRequests = async (req, res) => {
  try {
    const requests = await TextbookRequest.find()
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
    const request = await TextbookRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!request) {
      return res.status(404).json({ message: "Textbook request not found" });
    }
    res.status(200).json(request);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a textbook request
exports.deleteTextbookRequest = async (req, res) => {
  try {
    const request = await TextbookRequest.findByIdAndDelete(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Textbook request not found" });
    }
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
    request.evaluation.evaluatedBy = evaluatedBy || request.evaluation.evaluatedBy;
    request.evaluation.comment = comment || request.evaluation.comment;
    request.evaluation.evaluationDate = evaluationDate || request.evaluation.evaluationDate;

    await request.save();

    res.status(200).json(request);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
