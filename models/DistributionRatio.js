const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TextbookSchema = new Schema({
  id: { type: Schema.Types.ObjectId, ref: "Textbook", required: true },
  forPrivate: { type: Number },
  forPublic: { type: Number },
  total: { type: Number, required: true },
});

const RatioSchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  textbook: [TextbookSchema],
  payment: {
    type: String,
    enum: ["not-required", "paid", "not-paid"],
    default: "not-required",
  },
});

const DistributionRatioSchema = new Schema({
  preparedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  ratio: [RatioSchema],
});

module.exports = mongoose.model("DistributionRatio", DistributionRatioSchema);
