const mongoose = require("mongoose");

const Schema = mongoose.Schema;



const ScheduleSchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  date: {
    type: Date,
  },
  distributionCenter: {
    type: String,
  },
});

const DistributionSchedule = new Schema({
  preparedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  schedule: [ScheduleSchema],
});

module.exports = mongoose.model(
  "DistributionSchedule",
  DistributionSchedule
);
