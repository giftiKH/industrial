const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InvoiceTextbookSchema = new Schema({
  id: { type: Schema.Types.ObjectId, ref: "Textbook", required: true },
  forPrivate: { type: Number },
  forPublic: { type: Number },
  total: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  subtotal: { type: Number, required: true },
});

const AcceptanceSchema = new Schema({
  confirmation: {
    type: String,
    enum: ["confirmed", "not confirmed", "rejected"],
    default: "not confirmed",
  },
  date: { type: Date },
  comment: { type: String },
  confirmedBy: { type: Schema.Types.ObjectId, ref: "User" },
});

const InvoiceSchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  textbooks: [InvoiceTextbookSchema],
  distributionRatio: {
    type: Schema.Types.ObjectId,
    ref: "DistributionRatio",
    required: true,
  },
  subtotal: { type: Number, required: true },
  total: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["not-required", "paid", "not-paid"],
    default: "not-required",
  },
  acceptance: AcceptanceSchema,
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
