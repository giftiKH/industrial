const DistributionReport = require("../models/DistributionReport");
const DistributionRatio = require("../models/DistributionRatio");
const User = require("../models/user");

// Create a new distribution report
exports.createDistributionReport = async (req, res) => {
  const { distributionRatio, date, reporter, receiverName } = req.body;

  try {
    // Check if distributionRatio exists
    const ratio = await DistributionRatio.findById(distributionRatio);
    if (!ratio) {
      return res.status(404).json({ message: "Distribution ratio not found" });
    }

    // Check if reporter exists
    const user = await User.findById(reporter);
    if (!user) {
      return res.status(404).json({ message: "Reporter not found" });
    }

    const newDistributionReport = new DistributionReport({
      distributionRatio,
      date,
      reporter,
      receiverName,
    });

    await newDistributionReport.save();

    res.status(201).json(newDistributionReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all distribution reports
exports.getAllDistributionReports = async (req, res) => {
  try {
    const distributionReports = await DistributionReport.find()
      .populate("distributionRatio", "title")
      .populate("reporter", "name");
    res.status(200).json(distributionReports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get distribution report by ID
exports.getDistributionReportById = async (req, res) => {
  try {
    const distributionReport = await DistributionReport.findById(req.params.id)
      .populate("distributionRatio", "title")
      .populate("reporter", "name");
    if (!distributionReport) {
      return res.status(404).json({ message: "Distribution report not found" });
    }
    res.status(200).json(distributionReport);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update distribution report
exports.updateDistributionReport = async (req, res) => {
  try {
    const distributionReport = await DistributionReport.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!distributionReport) {
      return res.status(404).json({ message: "Distribution report not found" });
    }
    res.status(200).json(distributionReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete distribution report
exports.deleteDistributionReport = async (req, res) => {
  try {
    const distributionReport = await DistributionReport.findByIdAndDelete(
      req.params.id
    );
    if (!distributionReport) {
      return res.status(404).json({ message: "Distribution report not found" });
    }
    res
      .status(200)
      .json({ message: "Distribution report deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
