const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DistributionReportSchema = new Schema({
  distributionRatio: {
    type: Schema.Types.ObjectId,
    ref: "DistributionRatio",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  reporter: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("DistributionReport", DistributionReportSchema);
