const DistributionSchedule = require("../models/DistributionSchedule");

// Get all distribution schedules
exports.getAllDistributionSchedules = async (req, res) => {
  try {
    const distributionSchedules = await DistributionSchedule.find()
      .populate("preparedBy", "full_name")
      .populate("schedule.organization", "name");
    res.status(200).json(distributionSchedules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a distribution schedule by ID
exports.getDistributionScheduleById = async (req, res) => {
  try {
    const distributionSchedule = await DistributionSchedule.findById(
      req.params.id
    )
      .populate("preparedBy", "full_name")
      .populate("schedule.organization", "name");
    if (!distributionSchedule) {
      return res
        .status(404)
        .json({ message: "Distribution schedule not found" });
    }
    res.status(200).json(distributionSchedule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a distribution schedule
exports.updateDistributionSchedule = async (req, res) => {
  const { date, distributionCenter } = req.body;
  try {
    const distributionSchedule = await DistributionSchedule.findById(
      req.params.id
    );
    if (!distributionSchedule) {
      return res
        .status(404)
        .json({ message: "Distribution schedule not found" });
    }
    // Update schedule entries
    distributionSchedule.schedule.forEach((entry) => {
      if (entry._id.equals(req.body.scheduleId)) {
        if (date) entry.date = date;
        if (distributionCenter) entry.distributionCenter = distributionCenter;
      }
    });
    await distributionSchedule.save();
    res.status(200).json(distributionSchedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a distribution schedule
exports.deleteDistributionSchedule = async (req, res) => {
  try {
    const distributionSchedule = await DistributionSchedule.findByIdAndDelete(
      req.params.id
    );
    if (!distributionSchedule) {
      return res
        .status(404)
        .json({ message: "Distribution schedule not found" });
    }
    res
      .status(200)
      .json({ message: "Distribution schedule deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all distribution schedules
exports.getAllDistributionSchedules = async (req, res) => {
  try {
    const distributionSchedules = await DistributionSchedule.find()
      .populate("preparedBy", "full_name")
      .populate("schedule.organization", "name");
    res.status(200).json(distributionSchedules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a distribution schedule by ID
exports.getDistributionScheduleById = async (req, res) => {
  try {
    const distributionSchedule = await DistributionSchedule.findById(req.params.id)
      .populate("preparedBy", "full_name")
      .populate("schedule.organization", "name");
    if (!distributionSchedule) {
      return res.status(404).json({ message: "Distribution schedule not found" });
    }
    res.status(200).json(distributionSchedule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a distribution schedule
exports.updateDistributionSchedule = async (req, res) => {
  const { date, distributionCenter } = req.body;
  try {
    const distributionSchedule = await DistributionSchedule.findById(req.params.id);
    if (!distributionSchedule) {
      return res.status(404).json({ message: "Distribution schedule not found" });
    }
    // Update schedule entries
    distributionSchedule.schedule.forEach((entry) => {
      if (entry._id.equals(req.body.scheduleId)) {
        if (date) entry.date = date;
        if (distributionCenter) entry.distributionCenter = distributionCenter;
      }
    });
    await distributionSchedule.save();
    res.status(200).json(distributionSchedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a distribution schedule
exports.deleteDistributionSchedule = async (req, res) => {
  try {
    const distributionSchedule = await DistributionSchedule.findByIdAndDelete(req.params.id);
    if (!distributionSchedule) {
      return res.status(404).json({ message: "Distribution schedule not found" });
    }
    res.status(200).json({ message: "Distribution schedule deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
