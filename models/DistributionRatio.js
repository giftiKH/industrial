const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TextbookSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId, ref: "Textbook", required: true },
    forPrivate: { type: Number, required: true },
    forPublic: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { _id: false }
);

const RatioSchema = new Schema(
  {
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
  },
  { _id: false }
);

const DistributionRatioSchema = new Schema({
  preparedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  ratio: [RatioSchema],
});

module.exports = mongoose.model("DistributionRatio", DistributionRatioSchema);
