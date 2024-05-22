const mongoose = require("mongoose");
const DistributionRatio = require("../models/DistributionRatio");
const Organization = require("../models/Organization");
const Textbook = require("../models/Textbook");

// Create a new distribution ratio
exports.createDistributionRatio = async (req, res) => {
  const { preparedBy, title, ratio } = req.body;

  try {
    // Check if all textbooks and organizations exist
    const ratioExist = await Promise.all(
      ratio.map(async (item) => {
        const orgExist = await mongoose
          .model("Organization")
          .findById(item.organization);
        const textbooksExist = await Promise.all(
          item.textbook.map(async (textbookItem) => {
            const textbook = await mongoose
              .model("Textbook")
              .findById(textbookItem.id);
            return textbook !== null;
          })
        );
        return orgExist !== null && textbooksExist.every((exist) => exist);
      })
    );

    // If any organization or textbook does not exist, return error
    if (ratioExist.some((exist) => !exist)) {
      return res.status(400).json({
        message: "One or more organizations or textbooks do not exist",
      });
    }

    const newDistributionRatio = new DistributionRatio({
      preparedBy,
      title,
      ratio,
    });

    await newDistributionRatio.save();
    res.status(201).json(newDistributionRatio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all distribution ratios
exports.getAllDistributionRatios = async (req, res) => {
  try {
    const distributionRatios = await DistributionRatio.find()
      .populate("preparedBy", "full_name")
      .populate("ratio.organization", "name")
      .populate(
        "ratio.textbook.id",
        "title grade subject language category level"
      );
    res.status(200).json(distributionRatios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a distribution ratio by ID
exports.getDistributionRatioById = async (req, res) => {
  try {
    const distributionRatio = await DistributionRatio.findById(req.params.id)
      .populate("preparedBy", "full_name")
      .populate("ratio.organization", "name")
      .populate(
        "ratio.textbook.id",
        "title grade subject language category level"
      );
    if (!distributionRatio) {
      return res.status(404).json({ message: "Distribution ratio not found" });
    }
    res.status(200).json(distributionRatio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a distribution ratio
exports.updateDistributionRatio = async (req, res) => {
  try {
    const distributionRatio = await DistributionRatio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("preparedBy", "full_name")
      .populate("ratio.organization", "name")
      .populate(
        "ratio.textbook.id",
        "title grade subject language category level"
      );
    if (!distributionRatio) {
      return res.status(404).json({ message: "Distribution ratio not found" });
    }
    res.status(200).json(distributionRatio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a distribution ratio
exports.deleteDistributionRatio = async (req, res) => {
  try {
    const distributionRatio = await DistributionRatio.findByIdAndDelete(
      req.params.id
    );
    if (!distributionRatio) {
      return res.status(404).json({ message: "Distribution ratio not found" });
    }
    res
      .status(200)
      .json({ message: "Distribution ratio deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
